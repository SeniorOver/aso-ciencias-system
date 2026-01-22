import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager'; // <--- ¡CAMBIO AQUÍ!
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
  @UseInterceptors(CacheInterceptor) // <--- ¡ESTO ACTIVA REDIS AUTOMÁTICAMENTE!
  getUsers() {
    // Este mensaje solo saldrá en los logs cuando NO use caché (la primera vez o cada 60s)
    console.log('👀 Consultando a Base de Datos (Sin Caché)');
    return this.authService.findAll();
  }
}