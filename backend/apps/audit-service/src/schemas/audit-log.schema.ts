import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuditLogDocument = AuditLog & Document;

@Schema({ timestamps: true }) // Agrega createdAt y updatedAt automático
export class AuditLog {
  @Prop()
  action: string;

  @Prop()
  userId: string;

  @Prop()
  details: string;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);