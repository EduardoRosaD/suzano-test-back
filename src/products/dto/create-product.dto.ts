import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Notebook', description: 'Nome do produto' })
  nome: string;

  @ApiProperty({ example: 'Eletrônicos', description: 'Categoria do produto' })
  categoria: string;

  @ApiProperty({ example: 'Notebook potente com 16GB RAM', description: 'Descrição detalhada do produto' })
  descricao: string;

  @ApiProperty({ example: 3500.00, description: 'Preço do produto' })
  preco: number;

  @ApiProperty({ example: 10, description: 'Quantidade disponível em estoque' })
  quantidade_estoque: number;
}
