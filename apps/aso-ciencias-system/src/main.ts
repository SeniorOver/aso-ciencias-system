import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- HABILITAR CORS (Importante para que no te bloquee) ---
  app.enableCors();

  console.log('--- CONFIGURANDO RUTAS DEL GATEWAY PARA DOCKER ---');

  // ---------------------------------------------------------
  // GRUPO 1: LOS ORIGINALES (5 Servicios)
  // ---------------------------------------------------------

  // 1. Auth Service (Puerto 3000)
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://auth-service:3000', // Nombre del contenedor en Docker
      changeOrigin: true,
      pathRewrite: { '^/auth': '' },
    }),
  );

  // 2. Inventory Service (Puerto 3001)
  app.use(
    '/inventory',
    createProxyMiddleware({
      target: 'http://inventory-service:3001',
      changeOrigin: true,
      pathRewrite: { '^/inventory': '' },
    }),
  );

  // 3. Sales Service (Puerto 3002)
  app.use(
    '/sales',
    createProxyMiddleware({
      target: 'http://sales-service:3002',
      changeOrigin: true,
      pathRewrite: { '^/sales': '' },
    }),
  );

  // 4. Notification Service (Puerto 3003)
  app.use(
    '/notifications', // Ojo a la ruta
    createProxyMiddleware({
      target: 'http://notification-service:3003',
      changeOrigin: true,
      pathRewrite: { '^/notifications': '' },
    }),
  );

  // 5. Analytics Service (Puerto 3004)
  app.use(
    '/analytics',
    createProxyMiddleware({
      target: 'http://analytics-service:3004',
      changeOrigin: true,
      pathRewrite: { '^/analytics': '' },
    }),
  );

  // ---------------------------------------------------------
  // GRUPO 2: LOS NUEVOS (5 Servicios)
  // ---------------------------------------------------------

  // 6. Payment Service (Puerto 3005)
  app.use(
    '/payments',
    createProxyMiddleware({
      target: 'http://payment-service:3005',
      changeOrigin: true,
      pathRewrite: { '^/payments': '' },
    }),
  );

  // 7. Invoice Service (Puerto 3006) - REEMPLAZO DE SHIPPING
  app.use(
    '/invoice',
    createProxyMiddleware({
      target: 'http://invoice-service:3006',
      changeOrigin: true,
      pathRewrite: { '^/invoice': '' },
    }),
  );

  // 8. Review Service (Puerto 3007)
  app.use(
    '/reviews',
    createProxyMiddleware({
      target: 'http://review-service:3007',
      changeOrigin: true,
      pathRewrite: { '^/reviews': '' },
    }),
  );

  // 9. Support Service (Puerto 3008)
  app.use(
    '/support',
    createProxyMiddleware({
      target: 'http://support-service:3008',
      changeOrigin: true,
      pathRewrite: { '^/support': '' },
    }),
  );

  // 10. Audit Service (Puerto 3009)
  app.use(
    '/audit',
    createProxyMiddleware({
      target: 'http://audit-service:3009',
      changeOrigin: true,
      pathRewrite: { '^/audit': '' },
    }),
  );

  // El Gateway correrá en el Puerto 8080 (Expuesto al mundo)
  await app.listen(8080);
  console.log('🚀 API GATEWAY LISTO EN PUERTO 8080 (MODO DOCKER/AWS)');
}
bootstrap();