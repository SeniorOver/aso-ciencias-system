import { NestFactory } from '@nestjs/core';
import { SalesServiceModule } from './sales-service.module';

async function bootstrap() {
  const app = await NestFactory.create(SalesServiceModule);
  // Puerto 3002 para Ventas
  await app.listen(3002);
  console.log('Sales Service running on port 3002');
}
bootstrap();