import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  // 👇 AGREGADO: Necesario para que se vea en la tabla de usuarios
  @Column({ nullable: true }) 
  email: string;

  // 👇 AGREGADO: Nombre real de la persona
  @Column({ nullable: true }) 
  fullName: string;

  @Column()
  password: string;

  @Column({ default: 'CAJERO' })
  role: string; // Mantenemos 'role' en singular como lo tenías

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}