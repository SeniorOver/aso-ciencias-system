import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationServiceService } from './notification-service.service';

@Controller()
export class NotificationServiceController {
  constructor(private readonly notificationService: NotificationServiceService) {}

  @EventPattern('sale_created')
  handleSaleCreated(@Payload() data: any) {
    // Cuando Sales grita "¡Venta creada!", este servicio responde
    this.notificationService.sendEmail(data);
  }
}
