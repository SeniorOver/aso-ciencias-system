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

  // 👇👇👇 LÓGICA DE DESCUENTO 👇👇👇
  async decreaseStock(id: number, quantity: number) {
    // 1. Buscar producto
    // Nota: Convertimos id a número por si llega como string
    const product = await this.productRepo.findOne({ where: { id: Number(id) } });

    if (!product) {
      console.error(`❌ Producto ID ${id} no encontrado para descontar stock.`);
      return;
    }

    // 2. Validar que no quede negativo (Opcional, pero recomendado)
    if (product.stock < quantity) {
      console.warn(`⚠️ Stock insuficiente para el producto ${product.name}. Stock actual: ${product.stock}, Solicitado: ${quantity}`);
      // Aquí podrías decidir si dejarlo en negativo o no hacer nada. 
      // Por ahora, restamos igual para que veas el efecto.
    }

    // 3. Restar y Guardar
    product.stock = product.stock - quantity;
    await this.productRepo.save(product);
    console.log(`✅ Stock actualizado para ${product.name}. Nuevo stock: ${product.stock}`);
  }
}