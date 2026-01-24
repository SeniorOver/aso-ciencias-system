import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SalesServiceController } from './sales-service.controller';
import { SalesServiceService } from './sales-service.service';
import { Sale } from './sales/entities/sale.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    TypeOrmModule.forFeature([Sale]),
    
    ClientsModule.register([
      // 1. Notificaciones
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'notifications_queue',
          queueOptions: { durable: false },
        },
      },
      // 2. Inventario
      {
        name: 'INVENTORY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'inventory_queue_v2',
          queueOptions: { durable: false },
        },
      },
      // 3. Analytics
      {
        name: 'ANALYTICS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'analytics_queue',
          queueOptions: { durable: false },
        },
      },
      // 👇👇👇 4. FACTURACIÓN (¡AGREGAR ESTO!) 👇👇👇
      {
        name: 'INVOICE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'invoice_queue', // La misma cola que pusimos en invoice-service
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [SalesServiceController],
  providers: [SalesServiceService],
})
export class SalesServiceModule {}