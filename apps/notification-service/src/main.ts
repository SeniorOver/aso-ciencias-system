import { NestFactory } from '@nestjs/core';
import { NotificationServiceModule } from './notification-service.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  // Creamos la app Híbrida (HTTP + Microservicio)
  const app = await NestFactory.create(NotificationServiceModule);

  // Conectar a RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'notifications_queue', // Misma cola que definimos en Sales
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3003); // Puerto 3003 para Notificaciones
  console.log('Notification Service running on port 3003 (Listening RabbitMQ)');
}
bootstrap();