import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog, AuditLogDocument } from './schemas/audit-log.schema';

@Injectable()
export class AuditServiceService {
  constructor(
    @InjectModel(AuditLog.name) private auditLogModel: Model<AuditLogDocument>
  ) {}

  // Función para crear un log
  async createLog(action: string, userId: string, details: string) {
    const newLog = new this.auditLogModel({ action, userId, details });
    return newLog.save(); // <--- ¡AQUÍ SE GUARDA EN MONGO!
  }

  // Función para ver todos los logs
  async getLogs() {
    return this.auditLogModel.find().sort({ createdAt: -1 }).exec();
  }
}
