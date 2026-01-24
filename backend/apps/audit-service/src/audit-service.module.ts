import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditServiceController } from './audit-service.controller';
import { AuditServiceService } from './audit-service.service';
import { AuditLog, AuditLogSchema } from './schemas/audit-log.schema'; // <--- Importamos el esquema

@Module({
  imports: [
    // 1. Conexión a la Base de Datos
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/audit_db'),
    
    // 2. Registrar el Modelo de Logs
    MongooseModule.forFeature([{ name: AuditLog.name, schema: AuditLogSchema }]),
  ],
  controllers: [AuditServiceController],
  providers: [AuditServiceService],
})
export class AuditServiceModule {}
