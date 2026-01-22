import { Module } from '@nestjs/common'; // <--- YA NO IMPORTAMOS CacheModule DE AQUÍ
import { CacheModule } from '@nestjs/cache-manager'; // <--- ¡AQUÍ ESTÁ LA SOLUCIÓN!
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import * as redisStore from 'cache-manager-redis-store'; 
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    // 1. Configuración JWT
    JwtModule.register({
      secret: 'SECRET_KEY_PROYECTO_FINAL',
      signOptions: { expiresIn: '1h' },
    }),
    
    // 2. CONFIGURACIÓN REDIS (CACHÉ) - ¡NUEVO!
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      ttl: 60, // Los datos se guardan en memoria por 60 segundos
    }),

    // 3. Configuración Postgres
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || 'password123',
      database: process.env.DB_NAME || 'aso_db',
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule {}