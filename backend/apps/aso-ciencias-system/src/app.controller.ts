import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    
    // Inyección del Cliente Inventario
    @Inject('INVENTORY_SERVICE') private readonly inventoryClient: ClientProxy,
    
    // Inyección del Cliente Ventas
    @Inject('SALES_SERVICE') private readonly salesClient: ClientProxy,

    // Inyección del Cliente Analytics
    @Inject('ANALYTICS_SERVICE') private readonly analyticsClient: ClientProxy,

    // 👇 Inyección del Cliente Facturación (NUEVO)
    @Inject('INVOICE_SERVICE') private readonly invoiceClient: ClientProxy,
  ) {}

  @Get()
  getHello(): { message: string } {
    return this.appService.getData();
  }

  // --- RUTAS DE INVENTARIO ---
  @Get('inventory')
  async getProducts() {
    return this.inventoryClient.send({ cmd: 'get_products' }, {});
  }

  @Post('inventory')
  async createProduct(@Body() productData: any) {
    return this.inventoryClient.send({ cmd: 'create_product' }, productData);
  }

  // --- RUTAS DE VENTAS ---
  @Get('sales')
  async getSales() {
    return this.salesClient.send({ cmd: 'get_sales' }, {});
  }

  @Post('sales')
  async createSale(@Body() saleData: any) {
    return this.salesClient.send({ cmd: 'create_sale' }, saleData);
  }

  // --- RUTA DE ANALYTICS ---
  @Get('analytics')
  async getAnalytics() {
    return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
  }

  // --- 👇 RUTA DE FACTURAS (NUEVA) 👇 ---
  @Get('invoices')
  async getInvoices() {
    // Pedimos al microservicio la lista de facturas
    return this.invoiceClient.send({ cmd: 'get_invoices' }, {});
  }
}