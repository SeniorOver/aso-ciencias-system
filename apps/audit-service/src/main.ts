import { NestFactory } from '@nestjs/core';
import { AuditServiceModule } from './audit-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AuditServiceModule);
  // CORRECCIÓN: Definir explícitamente el 3009
  await app.listen(3009);
  console.log('Audit Service running on port 3009');
}
bootstrap();