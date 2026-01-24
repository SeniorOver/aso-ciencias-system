import { NestFactory } from '@nestjs/core';
import { AuditServiceModule } from './audit-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AuditServiceModule);
  
  // 👇 ESTA LÍNEA ES OBLIGATORIA PARA QUE EL FRONTEND PUEDA ENTRAR
  app.enableCors(); 
  
  await app.listen(3009);
  console.log('Audit Service running on port 3009');
}
bootstrap();