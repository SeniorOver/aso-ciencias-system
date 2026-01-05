import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users') // Esto creará automáticamente la tabla 'users' en Postgres
export class User {
  @PrimaryGeneratedColumn('uuid') // ID único y seguro (no adivinable)
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 'CAJERO' }) // Roles: ADMIN o CAJERO
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}