import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern, Payload } from '@nestjs/microservices';
import { InventoryServiceService } from './inventory-service.service';

@Controller()
export class InventoryServiceController {
  constructor(private readonly inventoryService: InventoryServiceService) {}

  @MessagePattern({ cmd: 'get_products' })
  async findAll() {
    return this.inventoryService.findAll();
  }

  @MessagePattern({ cmd: 'create_product' })
  async create(@Payload() data: any) {
    return this.inventoryService.create(data);
  }

  // 👇👇👇 NUEVO: Escuchar evento de Ventas 👇👇👇
  @EventPattern('decrease_stock')
  async handleStockDecrease(@Payload() data: any) {
    console.log('📉 Solicitud de baja de stock recibida:', data);
    await this.inventoryService.decreaseStock(data.productId, data.quantity);
  }
}
