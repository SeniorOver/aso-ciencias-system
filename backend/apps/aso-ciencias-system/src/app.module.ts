import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_SERVICE', 
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'], 
          queue: 'inventory_queue_v2', 
          queueOptions: { durable: false },
        },
      },
      {
        name: 'SALES_SERVICE', 
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'], 
          queue: 'sales_queue', 
          queueOptions: { durable: false },
        },
      },
      {
        name: 'ANALYTICS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'], 
          queue: 'analytics_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'INVOICE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'], 
          queue: 'invoice_queue', 
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
