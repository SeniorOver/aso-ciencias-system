import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AnalyticsServiceModule } from './analytics-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AnalyticsServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@rabbitmq:5672'],
        queue: 'analytics_queue', // <--- COLA NUEVA
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
  console.log('🚀 Analytics Microservice is listening via RabbitMQ');
}
bootstrap();