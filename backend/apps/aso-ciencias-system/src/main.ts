import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware'; // 👈 Asegúrate de tener esto

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // 1. PROXY PARA AUDITORÍA (Redirige /audit al microservicio)
  app.use(
    '/audit',
    createProxyMiddleware({
      target: 'http://audit-service:3009', // Nombre en Docker Compose
      changeOrigin: true,
      pathRewrite: {
        '^/audit': '',
      },
    }),
  );

  // 2. PROXY PARA AUTH (Para el Login)
  // IMPORTANTE: Si tu auth-service corre en el puerto 3000, úsalo así.
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://auth-service:3000',
      changeOrigin: true,
      pathRewrite: {
        '^/auth': '',
      },
    }),
  );

  await app.listen(8080);
  console.log('API Gateway (aso-ciencias-system) running on port 8080');
}
bootstrap();
