import { Module } from '@nestjs/common';
import { SupportServiceController } from './support-service.controller';
import { SupportServiceService } from './support-service.service';

@Module({
  imports: [],
  controllers: [SupportServiceController],
  providers: [SupportServiceService],
})
export class SupportServiceModule {}
