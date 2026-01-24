import { Controller, Get } from '@nestjs/common';
import { SupportServiceService } from './support-service.service';

@Controller()
export class SupportServiceController {
  constructor(private readonly supportServiceService: SupportServiceService) {}

  @Get()
  getHello(): string {
    return this.supportServiceService.getHello();
  }
}
