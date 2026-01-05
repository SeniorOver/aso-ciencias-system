import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    // 1. Configuración de la conexión a Postgres
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',      // Se conecta al Docker que acabas de levantar
      port: 5432,
      username: 'admin',      // Lo definimos en el docker-compose
      password: 'password123',// Lo definimos en el docker-compose
      database: 'aso_db',     // Lo definimos en el docker-compose
      autoLoadEntities: true, // Carga las tablas solas
      synchronize: true,      // ¡OJO! Solo para desarrollo: crea las tablas si no existen
    }),
    // 2. Registramos la tabla User para poder usarla
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule {}