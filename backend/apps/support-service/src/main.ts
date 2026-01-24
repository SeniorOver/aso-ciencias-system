import { NestFactory } from '@nestjs/core';
import { SupportServiceModule } from './support-service.module';

async function bootstrap() {
  const app = await NestFactory.create(SupportServiceModule);
  await app.listen(process.env.port ?? 3008);
}
bootstrap();
