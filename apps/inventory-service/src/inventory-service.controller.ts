import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { InventoryServiceService } from './inventory-service.service';

@Controller('products') // Escuchará en /products
export class InventoryServiceController {
  constructor(private readonly inventoryService: InventoryServiceService) {}

  @Post()
  create(@Body() body: any) {
    return this.inventoryService.create(body);
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }
   
  @Patch(':id/decrease')
  decreaseStock(
    @Param('id') id: number,
    @Body('quantity') quantity: number,
  ) {
    return this.inventoryService.decreaseStock(id, quantity);
  }

}