import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { InventoryServiceModule } from './inventory-service.module'; // Asegúrate que este nombre coincida con tu archivo module

async function bootstrap() {
  // EN LUGAR DE create(), USAMOS createMicroservice()
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InventoryServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@rabbitmq:5672'], // Conecta al contenedor de RabbitMQ
        queue: 'inventory_queue_v2', // La misma cola que pusimos en el Gateway
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  
  await app.listen();
  console.log('🚀 Inventory Microservice is listening via RabbitMQ');
}
bootstrap();