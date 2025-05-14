import { Injectable, BadRequestException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    let total = 0;

    for (const item of createOrderDto.produtos) {
      const product = await this.productsService.findOne(item.productId);

      if (product.quantidade_estoque < item.quantidade) {
        throw new BadRequestException(`Estoque insuficiente para o produto ${product.nome}`);
      }

      total += product.preco * item.quantidade;
    }

    // Atualiza o estoque após validar
    for (const item of createOrderDto.produtos) {
      const product = await this.productsService.findOne(item.productId);
      await this.productsService.update(product.id, {
        quantidade_estoque: product.quantidade_estoque - item.quantidade,
      });
    }

    const newOrder = {
      produtos: createOrderDto.produtos,
      total_pedido: total,
      status: createOrderDto.status,
    };

    return this.ordersRepository.create(newOrder as any);
  }

  findAll() {
    return this.ordersRepository.findAll();
  }
}
