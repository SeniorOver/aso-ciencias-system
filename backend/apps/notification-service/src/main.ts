import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationServiceModule } from './notification-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@rabbitmq:5672'],
        queue: 'notifications_queue', // <--- ESTA COLA ES CLAVE (Coincide con Sales)
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  
  await app.listen();
  console.log('🚀 Notification Microservice is listening via RabbitMQ');
}
bootstrap();