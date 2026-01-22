import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuditLogDocument = AuditLog & Document;

@Schema()
export class AuditLog {
  @Prop({ required: true })
  action: string; // Ejemplo: "LOGIN_USER"

  @Prop({ required: true })
  userId: string; // Ejemplo: "erick_admin"

  @Prop()
  details: string; // Ejemplo: "Usuario ingresó desde IP..."

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);