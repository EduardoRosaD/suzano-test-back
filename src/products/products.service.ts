import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

async create(createProductDto: CreateProductDto) {
    const existingProduct = await this.productsRepository.findByName(createProductDto.nome);
    console.log('existingProduct', existingProduct);
    if (existingProduct) {
        throw new BadRequestException(`Produto com nome "${createProductDto.nome}" já existe`);
    }
    return this.productsRepository.create(createProductDto);
}

  async findAll() {
    return this.productsRepository.findAll();
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const existing = await this.findOne(id);
    await this.productsRepository.update(id, updateProductDto);
    return { ...existing, ...updateProductDto };
  }

  async remove(id: number) {
    const existing = await this.findOne(id);
    await this.productsRepository.remove(id);
    return { message: `Produto com ID ${id} removido com sucesso` };
  }
}
