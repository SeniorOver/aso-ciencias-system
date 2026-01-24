import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices'; // <--- Importante
import { SalesServiceService } from './sales-service.service';

@Controller()
export class SalesServiceController {
  constructor(private readonly salesService: SalesServiceService) {}

  @MessagePattern({ cmd: 'create_sale' }) // <--- Escucha el comando del Gateway
  createSale(@Payload() body: any) {
    console.log('💰 Venta recibida en microservicio:', body);
    return this.salesService.create(body);
  }

  @MessagePattern({ cmd: 'get_sales' }) // <--- Escucha el comando del Gateway
  getSales() {
    console.log('💰 Buscando historial de ventas...');
    return this.salesService.findAll();
  }
}