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
      port: 5432,
      username: 'admin',
      password: 'password123',
      database: 'aso_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule {}