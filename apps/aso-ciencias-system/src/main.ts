import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- HABILITAR CORS ---
  app.enableCors();

  console.log('--- 🚀 INICIANDO API GATEWAY (CORREGIDO) ---');

  // ---------------------------------------------------------
  // GRUPO 1: LOS ORIGINALES (5 Servicios)
  // ---------------------------------------------------------

  // 1. Auth Service
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://auth-service:3000',
      changeOrigin: true,
      pathRewrite: { '^/auth': '' },
    }),
  );

  // 2. Inventory Service
  app.use(
    '/inventory',
    createProxyMiddleware({
      target: 'http://inventory-service:3001',
      changeOrigin: true,
      pathRewrite: { '^/inventory': '' },
    }),
  );

  // 3. Sales Service
  app.use(
    '/sales',
    createProxyMiddleware({
      target: 'http://sales-service:3002',
      changeOrigin: true,
      pathRewrite: { '^/sales': '' },
    }),
  );

  // 4. Notification Service
  app.use(
    '/notifications',
    createProxyMiddleware({
      target: 'http://notification-service:3003',
      changeOrigin: true,
      pathRewrite: { '^/notifications': '' },
    }),
  );

  // 5. Analytics Service
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

  // 6. Payment Service
  app.use(
    '/payments',
    createProxyMiddleware({
      target: 'http://payment-service:3005',
      changeOrigin: true,
      pathRewrite: { '^/payments': '' },
    }),
  );

  // 7. Invoice Service
  app.use(
    '/invoice',
    createProxyMiddleware({
      target: 'http://invoice-service:3006',
      changeOrigin: true,
      pathRewrite: { '^/invoice': '' },
    }),
  );

  // 8. Review Service
  app.use(
    '/reviews',
    createProxyMiddleware({
      target: 'http://review-service:3007',
      changeOrigin: true,
      pathRewrite: { '^/reviews': '' },
    }),
  );

  // 9. Support Service
  app.use(
    '/support',
    createProxyMiddleware({
      target: 'http://support-service:3008',
      changeOrigin: true,
      pathRewrite: { '^/support': '' },
    }),
  );

  // 10. Audit Service (Puerto 3009)
  // --- ¡AQUÍ ESTÁ EL CAMBIO CLAVE! ---
  app.use(
    '/audit',
    createProxyMiddleware({
      // Usamos el nombre del CONTENEDOR (aso_audit) que vimos en docker ps
      target: 'http://aso_audit:3009', 
      changeOrigin: true,
      // Mantenemos /audit porque tu controlador es @Controller('audit')
      // Esto nos ayudará a ver errores en el log si falla
      onError: (err, req, res) => {
        console.error('🔥 ERROR CONECTANDO CON AUDIT:', err);
        // Usamos 'res' como any para evitar quejas de tipos en la respuesta
        (res as any).status(500).send('Error de conexión con Microservicio Audit');
      }
    } as any),
  );

  await app.listen(8080);
  console.log('🚀 API GATEWAY LISTO EN PUERTO 8080 (MODO DOCKER/AWS)');
}
bootstrap();
