import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt'; // <--- NUEVO
import { User } from './users/entities/user.entity';

@Injectable()
export class AuthServiceService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService, // <--- INYECCION NUEVA
  ) {}

  // Función LOGIN (NUEVA: Genera el Token)
  async login(user: any) {
    // Aquí creamos el contenido del token (payload)
    const payload = { username: user.username, sub: user.id || 1 };
    
    return {
      access_token: this.jwtService.sign(payload), // <--- FIRMA DEL JWT
      user: user.username
    };
  }

  // Función crear usuario (YA LA TENIAS)
  async create(userData: any) {
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  // Función listar (YA LA TENIAS)
  async findAll() {
    return await this.userRepository.find();
  }
}