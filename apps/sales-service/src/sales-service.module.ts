import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices'; // <--- IMPORTANTE
import { SalesServiceController } from './sales-service.controller';
import { SalesServiceService } from './sales-service.service';
import { Sale } from './sales/entities/sale.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
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
        name: 'NOTIFICATION_SERVICE', // Nombre interno para inyectar
        transport: Transport.RMQ,     // Usamos protocolo RabbitMQ
        options: {
          urls: ['amqp://localhost:5672'], // URL de tu Docker
          queue: 'notifications_queue',    // Nombre de la cola
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