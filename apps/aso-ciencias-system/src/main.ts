import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // Asegúrate que esta ruta esté bien
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- CONFIGURACIÓN DE RUTAS DEL GATEWAY ---

  // 1. Auth Service (Puerto 3000)
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: {
        '^/auth': '', 
      },
    }),
  );

  // 2. Inventory Service (Puerto 3001)
  app.use(
    '/inventory',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: {
        '^/inventory': '',
      },
    }),
  );

  // 3. Sales Service (Puerto 3002)
  app.use(
    '/sales',
    createProxyMiddleware({
      target: 'http://localhost:3002',
      changeOrigin: true,
      pathRewrite: {
        '^/sales': '',
      },
    }),
  );

  // El Gateway correrá en el Puerto 8080
  await app.listen(8080);
  console.log('🚀 API GATEWAY corriendo en http://localhost:8080');
}
bootstrap();