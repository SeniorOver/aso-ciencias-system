import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';

@Controller() // Esto escucha en la raíz del microservicio
export class AuthServiceController {
  constructor(private readonly authService: AuthServiceService) {}

  @Post('register') // Ruta: POST /register
  createUser(@Body() body: any) {
    return this.authService.create(body);
  }

  @Get('users') // Ruta: GET /users
  getUsers() {
    return this.authService.findAll();
  }
}