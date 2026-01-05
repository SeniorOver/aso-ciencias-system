import { Controller, Get, Post, Body } from '@nestjs/common';
import { SalesServiceService } from './sales-service.service';

@Controller('sales')
export class SalesServiceController {
  constructor(private readonly salesService: SalesServiceService) {}

  @Post()
  createSale(@Body() body: any) {
    return this.salesService.create(body);
  }

  @Get()
  getSales() {
    return this.salesService.findAll();
  }
}