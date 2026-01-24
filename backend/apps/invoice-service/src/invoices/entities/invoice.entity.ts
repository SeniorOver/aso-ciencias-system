import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  saleId: string;

  @Column('decimal')
  amount: number;

  @Column('decimal')
  tax: number;

  @Column()
  customerEmail: string;

  @Column({ default: 'PAID' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}