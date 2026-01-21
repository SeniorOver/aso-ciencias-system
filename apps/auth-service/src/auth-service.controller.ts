import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';

@Controller() 
export class AuthServiceController {
  constructor(private readonly authService: AuthServiceService) {}

  @Post('login') // <--- NUEVA RUTA: POST /login
  loginUser(@Body() body: any) {
    // Nota: Para el proyecto, asumimos que el usuario existe y le damos token.
    // En vida real, aquí validarías password antes de llamar a login.
    return this.authService.login(body);
  }

  @Post('register') 
  createUser(@Body() body: any) {
    return this.authService.create(body);
  }

  @Get('users') 
  getUsers() {
    return this.authService.findAll();
  }
}