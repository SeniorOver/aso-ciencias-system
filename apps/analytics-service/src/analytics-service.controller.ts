import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AnalyticsServiceService } from './analytics-service.service';

@Controller()
export class AnalyticsServiceController {
  constructor(private readonly analyticsService: AnalyticsServiceService) {}

  @Get()
  getHello(): string {
    return this.analyticsService.getHello();
  }

  // ¡AQUÍ ESTÁ LA MAGIA!
  // Este servicio TAMBIÉN escucha cuando se vende algo
  @EventPattern('sale_created')
  handleSaleAnalytics(@Payload() data: any) {
    console.log('💰 [ANALYTICS] Venta detectada. Analizando datos...');
    console.log(`   - Producto ID: ${data.product}`);
    console.log(`   - Monto ganado: $${data.total}`);
    // Aquí podrías guardar esto en una tabla de reportes mensuales
    console.log('   -> Dashboard actualizado.');
    console.log('------------------------------------------------');
  }
}