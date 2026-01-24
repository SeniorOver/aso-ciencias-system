import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SalesServiceModule } from './sales-service.module';

async function bootstrap() {
  // CAMBIO RADICAL: createMicroservice en lugar de create
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SalesServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@rabbitmq:5672'], // Credenciales explícitas
        queue: 'sales_queue', // <--- COLA NUEVA PARA VENTAS
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  
  await app.listen();
  console.log('🚀 Sales Microservice is listening via RabbitMQ');
}
bootstrap();