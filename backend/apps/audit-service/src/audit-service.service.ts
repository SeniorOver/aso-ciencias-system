import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// Asegúrate de que esta ruta exista 👇
import { AuditLog, AuditLogDocument } from './schemas/audit-log.schema';

@Injectable()
export class AuditServiceService {
  constructor(
    @InjectModel(AuditLog.name) private auditLogModel: Model<AuditLogDocument>
  ) {}

  async createLog(action: string, userId: string, details: string) {
    const newLog = new this.auditLogModel({ action, userId, details });
    return newLog.save();
  }

  async getLogs() {
    // Ordenamos por fecha descendente (lo más nuevo primero)
    return this.auditLogModel.find().sort({ createdAt: -1 }).exec();
  }
}