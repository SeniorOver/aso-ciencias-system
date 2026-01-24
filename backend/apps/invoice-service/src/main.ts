import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { InvoiceServiceModule } from './invoice-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InvoiceServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@rabbitmq:5672'],
        queue: 'invoice_queue', // <--- IMPORTANTE
        queueOptions: { durable: false },
      },
    },
  );
  await app.listen();
  console.log('🚀 Invoice Microservice listening via RabbitMQ');
}
bootstrap();
