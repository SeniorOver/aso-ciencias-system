import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products/entities/product.entity';

@Injectable()
export class InventoryServiceService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  create(data: any) {
    const newProduct = this.productRepo.create(data);
    return this.productRepo.save(newProduct);
  }

  findAll() {
    return this.productRepo.find();
  }
// Método para restar stock
async decreaseStock(id: number, quantity: number) {
  const product = await this.productRepo.findOne({ where: { id } });

  if (!product) {
    throw new Error('Producto no encontrado'); // O usa NotFoundException
  }

  if (product.stock < quantity) {
    throw new Error('No hay suficiente stock'); // O usa BadRequestException
  }

  product.stock = product.stock - quantity;
  return this.productRepo.save(product);
}

}