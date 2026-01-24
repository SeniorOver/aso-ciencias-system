import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthServiceService } from './auth-service.service';

@Controller() 
export class AuthServiceController {
  constructor(private readonly authService: AuthServiceService) {}

  @Post('login')
  loginUser(@Body() body: any) {
    return this.authService.login(body);
  }

  @Post('register') 
  createUser(@Body() body: any) {
    return this.authService.create(body);
  }

  @Get('users') 
  @UseInterceptors(CacheInterceptor) // ✅ Caché activado
  getUsers() {
    console.log('👀 Consultando usuarios a Base de Datos (Sin Caché)');
    return this.authService.findAll();
  }
}