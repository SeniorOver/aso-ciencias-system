import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationServiceService {
  
  sendEmail(data: any) {
    console.log('📧 ----------------------------------------------------');
    console.log(`📧 NUEVO CORREO PARA: ${data.email}`);
    console.log(`📧 ASUNTO: Confirmación de Venta #${data.saleId}`);
    console.log(`📧 CUERPO: ¡Gracias por tu compra! Total pagado: $${data.total}`);
    console.log('📧 ----------------------------------------------------');
  }
}
