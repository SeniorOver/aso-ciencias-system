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
      host: process.env.DB_HOST || 'postgres',
      port: parseInt(process.env.DB_PORT || '5432'), // <--- Agregado parseInt
      username: process.env.DB_USERNAME || 'admin', // <--- CORREGIDO: Ahora lee la variable
      password: process.env.DB_PASSWORD || 'password123',
      database: process.env.DB_NAME || 'aso_db',
      autoLoadEntities: true,
      synchronize: true,
      // CONFIGURACIÓN SSL (Obligatoria para AWS RDS)
      ssl: process.env.DB_SSL === 'true' ? {
        rejectUnauthorized: false
      } : false,
    }),
    TypeOrmModule.forFeature([Sale]),
    HttpModule,
    // CONFIGURACIÓN RABBITMQ (EMISOR)
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
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