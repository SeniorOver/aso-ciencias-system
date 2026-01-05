import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices'; // <--- Importante
import { NotificationServiceService } from './notification-service.service';

@Controller()
export class NotificationServiceController {
  constructor(private readonly notificationService: NotificationServiceService) {}

  // ESCUCHADOR DE EVENTOS (RabbitMQ)
  @EventPattern('sale_created') // Mismo nombre que emitimos en Sales
  handleSaleCreated(@Payload() data: any) {
    // Aquí es donde enviaríamos el email real
    console.log('📧 ¡NUEVA NOTIFICACIÓN RECIBIDA!');
    console.log(`Mensaje: Se ha registrado la venta #${data.saleId}`);
    console.log(`Enviar correo a: ${data.email}`);
    console.log('------------------------------------------------');
  }
}