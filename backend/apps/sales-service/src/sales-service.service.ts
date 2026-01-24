import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Sale } from './sales/entities/sale.entity';

@Injectable()
export class SalesServiceService {
  constructor(
    @InjectRepository(Sale)
    private saleRepo: Repository<Sale>,
    
    @Inject('NOTIFICATION_SERVICE') private clientNotif: ClientProxy, 
    @Inject('INVENTORY_SERVICE') private clientInventory: ClientProxy,
    @Inject('ANALYTICS_SERVICE') private clientAnalytics: ClientProxy,

    // 👇 INYECTAR CLIENTE DE FACTURAS
    @Inject('INVOICE_SERVICE') private clientInvoice: ClientProxy, 
  ) {}

  async create(data: any) {
    console.log('🛒 Procesando venta...', data);

    const newSale = this.saleRepo.create(data);
    const savedSale = (await this.saleRepo.save(newSale)) as unknown as Sale;

    // 1. Descontar Stock
    this.clientInventory.emit('decrease_stock', {
      productId: data.productId,
      quantity: data.quantity,
    });

    // 2. Notificar Email
    this.clientNotif.emit('sale_created', {
      saleId: savedSale.id, 
      email: 'admin@empresa.com',
      total: data.totalPrice,
      product: data.productId
    });

    // 3. Avisar a Analytics
    this.clientAnalytics.emit('sale_created', {
      saleId: savedSale.id,
      total: data.totalPrice,
      date: new Date()
    });

    // 👇👇👇 4. AVISAR A FACTURACIÓN (¡NUEVO!) 👇👇👇
    // Enviamos el evento para que Invoice Service cree la factura
    this.clientInvoice.emit('sale_created', {
      saleId: savedSale.id,
      total: data.totalPrice,
      email: 'cliente@ejemplo.com' // Podrías capturar esto del front si quisieras
    });

    return savedSale;
  }

  findAll() {
    return this.saleRepo.find();
  }
}