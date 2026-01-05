import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: number; // ID del producto que vendimos (ej: el 2 de los Doritos)

  @Column()
  quantity: number;  // Cuántos vendimos

  @Column('decimal')
  totalPrice: number; // Cuánto cobramos

  @CreateDateColumn()
  soldAt: Date; // Cuándo ocurrió
}