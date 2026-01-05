import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';

@Injectable()
export class AuthServiceService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Función para crear usuario
  async create(userData: any) {
    // 1. Crea la instancia del usuario
    const newUser = this.userRepository.create(userData);
    // 2. Lo guarda en la base de datos
    return await this.userRepository.save(newUser);
  }

  // Función para listar todos los usuarios
  async findAll() {
    return await this.userRepository.find();
  }
}