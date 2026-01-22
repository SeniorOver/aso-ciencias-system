import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryServiceController } from './inventory-service.controller';
import { InventoryServiceService } from './inventory-service.service';
import { Product } from './products/entities/product.entity';

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
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [InventoryServiceController],
  providers: [InventoryServiceService],
})
export class InventoryServiceModule {}