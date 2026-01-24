import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceServiceController } from './invoice-service.controller';
import { InvoiceServiceService } from './invoice-service.service';
import { Invoice } from './invoices/entities/invoice.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    TypeOrmModule.forFeature([Invoice]),
  ],
  controllers: [InvoiceServiceController],
  providers: [InvoiceServiceService],
})
export class InvoiceServiceModule {}
