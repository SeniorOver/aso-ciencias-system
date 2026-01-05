import { NestFactory } from '@nestjs/core';
import { InventoryServiceModule } from './inventory-service.module';

async function bootstrap() {
  const app = await NestFactory.create(InventoryServiceModule);
  // IMPORTANTE: Puerto 3001 para que no choque con Auth (3000)
  await app.listen(3001); 
  console.log('Inventory Service running on port 3001');
}
bootstrap();