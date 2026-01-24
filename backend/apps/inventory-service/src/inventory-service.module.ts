import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryServiceController } from './inventory-service.controller';
import { InventoryServiceService } from './inventory-service.service';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [
    // 1. Configuración de la Base de Datos (Postgres en AWS)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // ⚠️ IMPORTANTE: Esto creará la tabla automáticamente si no existe
      ssl: {
        rejectUnauthorized: false, // Necesario para RDS
      },
    }),
    // 2. Registramos la entidad Producto para poder usarla
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [InventoryServiceController],
  providers: [InventoryServiceService],
})
export class InventoryServiceModule {}