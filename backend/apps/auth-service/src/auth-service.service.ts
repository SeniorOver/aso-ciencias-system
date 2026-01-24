import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/entities/user.entity';

@Injectable()
export class AuthServiceService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 1. VALIDAR USUARIO (¡NUEVO!)
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    
    // Si el usuario existe Y la contraseña coincide
    if (user && user.password === pass) {
      const { password, ...result } = user; // Quitamos el password del resultado
      return result;
    }
    return null;
  }

  // 2. LOGIN (MODIFICADO)
  async login(user: any) {
    // Primero validamos
    const validUser = await this.validateUser(user.username, user.password);
    
    if (!validUser) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Si pasa, generamos el token
    const payload = { username: validUser.username, sub: validUser.id, role: validUser.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: validUser.username,
      role: validUser.role
    };
  }

  async create(userData: any) {
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find({
      select: ['id', 'username', 'email', 'fullName', 'isActive', 'role', 'createdAt'] 
    });
  }
}