import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuditServiceService } from './audit-service.service';

// 👇 CAMBIO: Lo dejamos vacío @Controller()
// El Gateway ya nos manda a /audit, así que aquí escuchamos en la raíz
@Controller() 
export class AuditServiceController {
  constructor(private readonly auditService: AuditServiceService) {}

  @Post()
  create(@Body() body: any) {
    return this.auditService.createLog(body.action, body.userId, body.details);
  }

  @Get()
  findAll() {
    return this.auditService.getLogs();
  }
}
