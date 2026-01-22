import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuditServiceService } from './audit-service.service';

@Controller('audit') // <--- Ruta base: /audit
export class AuditServiceController {
  constructor(private readonly auditService: AuditServiceService) {}

  @Post()
  create(@Body() body: any) {
    // Esperamos recibir: { "action": "...", "userId": "...", "details": "..." }
    return this.auditService.createLog(body.action, body.userId, body.details);
  }

  @Get()
  findAll() {
    return this.auditService.getLogs();
  }
}
