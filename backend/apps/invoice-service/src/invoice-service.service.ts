import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoices/entities/invoice.entity';
@Injectable()
export class InvoiceServiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepo: Repository<Invoice>,
  ) {}

  async createInvoice(data: any) {
    console.log('📄 Generando factura para venta:', data.saleId);
    
    // Calculamos IVA (12%)
    const total = Number(data.total);
    const subtotal = total / 1.12;
    const tax = total - subtotal;

    const newInvoice = this.invoiceRepo.create({
      saleId: data.saleId,
      amount: total,
      tax: tax,
      customerEmail: data.email || 'cliente@final.com',
      status: 'PAID'
    });

    await this.invoiceRepo.save(newInvoice);
    console.log('✅ Factura guardada.');
  }

  findAll() {
    return this.invoiceRepo.find({ order: { createdAt: 'DESC' } });
  }
}