import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SalesServiceController } from './sales-service.controller';
import { SalesServiceService } from './sales-service.service';
import { Sale } from './sales/entities/sale.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // CORRECCIÓN 1: Usar nombre del contenedor 'postgres'
      host: process.env.DB_HOST || 'postgres', 
      port: 5432,
      username: 'admin',
      password: 'password123',
      database: 'aso_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Sale]),
    HttpModule,
    // CONFIGURACIÓN RABBITMQ (EMISOR)
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          // CORRECCIÓN 2: Usar nombre del contenedor 'rabbitmq'
          urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'], 
          queue: 'notifications_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [SalesServiceController],
  providers: [SalesServiceService],
})
export class SalesServiceModule {}