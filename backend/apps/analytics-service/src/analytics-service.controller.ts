import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AnalyticsServiceService } from './analytics-service.service';

@Controller()
export class AnalyticsServiceController {
  constructor(private readonly analyticsService: AnalyticsServiceService) {}

  // 1. ESCUCHAR VENTAS (RabbitMQ)
  // Cada vez que Sales grita "¡Venta!", Analytics anota el gol.
  @EventPattern('sale_created')
  handleSaleCreated(@Payload() data: any) {
    this.analyticsService.handleSale(data);
  }

  // 2. RESPONDER AL DASHBOARD (HTTP -> Gateway -> Rabbit -> Aquí)
  @MessagePattern({ cmd: 'get_analytics' })
  getAnalytics() {
    return this.analyticsService.getStats();
  }
}