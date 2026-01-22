import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // <--- NUEVO
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    // 1. Configuración JWT (NUEVO)
    JwtModule.register({
      secret: 'SECRET_KEY_PROYECTO_FINAL', // En prod usa variables de entorno
      signOptions: { expiresIn: '1h' },
    }),
    
    // 2. Configuración Postgres (LO QUE YA TENIAS)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'admin', // <--- ¡Ahora sí escucha!
      password: process.env.DB_PASSWORD || 'password123',
      database: process.env.DB_NAME || 'aso_db',
      autoLoadEntities: true,
      synchronize: true,
      // CONFIGURACIÓN SSL (Obligatoria para AWS RDS)
      ssl: process.env.DB_SSL === 'true' ? {
        rejectUnauthorized: false
      } : false,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule {}