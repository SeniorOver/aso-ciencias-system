import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsServiceService {
  // Memoria temporal (si reinicias analytics se borra, pero para el demo sirve perfecto)
  private totalRevenue = 0;
  private totalSalesCount = 0;
  private lastSales: any[] = [];

  handleSale(data: any) {
    console.log('📈 Analytics recibió una venta de:', data.total);
    
    // Sumar al total acumulado
    this.totalRevenue += Number(data.total);
    this.totalSalesCount++;
    
    // Guardar en historial reciente (últimas 5)
    this.lastSales.push({ ...data, date: new Date() });
    if (this.lastSales.length > 5) {
      this.lastSales.shift(); // Borrar la más vieja
    }
  }

  getStats() {
    return {
      totalRevenue: this.totalRevenue,
      totalSales: this.totalSalesCount,
      recentSales: this.lastSales
    };
  }
}