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
    @Inject('NOTIFICATION_SERVICE') private clientRabbit: ClientProxy, 
  ) {}

  async create(data: any) {
    // 1. Comunicación HTTP con Inventario (Síncrona)
    try {
      await lastValueFrom(
        this.httpService.patch(
          `http://localhost:3001/products/${data.productId}/decrease`,
          { quantity: data.quantity }
        )
      );
    } catch (error) {
      console.error('Error stock:', error.message);
      throw new Error('Stock insuficiente');
    }

    // 2. Guardar Venta
    // CORRECCIÓN AQUÍ: Agregamos ': Sale'
// Quitamos el ': Sale' del inicio y ponemos 'as Sale' al final
// Le decimos: Trátalo como 'desconocido' y luego fuérzalo a ser 'Sale'
    const newSale = this.saleRepo.create(data) as unknown as Sale;
    const savedSale = await this.saleRepo.save(newSale);

    // 3. COMUNICACIÓN ASÍNCRONA (RabbitMQ)
    this.clientRabbit.emit('sale_created', {
      saleId: savedSale.id, // ¡Ahora esto funcionará!
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