import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Sale } from './sales/entities/sale.entity';

@Injectable()
export class SalesServiceService {
  constructor(
    @InjectRepository(Sale)
    private saleRepo: Repository<Sale>,
    private readonly httpService: HttpService,
    // Inyectamos el cliente RabbitMQ configurado en el Module
    @Inject('NOTIFICATION_SERVICE') private clientRabbit: ClientProxy, 
  ) {}

  async create(data: any) {
    // 1. Comunicación HTTP con Inventario (Síncrona)
    try {
      // CORRECCIÓN CRÍTICA: Cambiamos 'localhost' por 'inventory-service'
      // Docker DNS resolverá 'inventory-service' a la IP correcta del contenedor vecino.
      await lastValueFrom(
        this.httpService.patch(
          `http://inventory-service:3001/products/${data.productId}/decrease`,
          { quantity: data.quantity }
        )
      );
    } catch (error) {
      console.error('Error stock:', error.message);
      // Tip: Si inventario falla, lanzamos error y NO guardamos la venta
      throw new Error('Stock insuficiente o Error de Conexión con Inventario');
    }

    // 2. Guardar Venta
    const newSale = this.saleRepo.create(data) as unknown as Sale;
    const savedSale = await this.saleRepo.save(newSale);

    // 3. COMUNICACIÓN ASÍNCRONA (RabbitMQ)
    // Emitimos el evento 'sale_created' a la cola
    this.clientRabbit.emit('sale_created', {
      saleId: savedSale.id,
      product: data.productId,
      total: data.totalPrice,
      email: 'admin@empresa.com'
    });

    return savedSale;
  }

  findAll() {
    return this.saleRepo.find();
  }
}