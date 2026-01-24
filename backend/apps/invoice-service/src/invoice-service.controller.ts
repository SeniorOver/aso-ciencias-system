import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { InvoiceServiceService } from './invoice-service.service';

@Controller()
export class InvoiceServiceController {
  constructor(private readonly invoiceService: InvoiceServiceService) {}

  // 👂 ESCUCHA: Cuando alguien vende, generamos factura
  @EventPattern('sale_created')
  handleSaleCreated(@Payload() data: any) {
    this.invoiceService.createInvoice(data);
  }

  // 📡 RESPONDE: El Frontend pedirá la lista de facturas
  @MessagePattern({ cmd: 'get_invoices' })
  getInvoices() {
    return this.invoiceService.findAll();
  }
}
