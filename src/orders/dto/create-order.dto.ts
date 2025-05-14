import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: [{ productId: 1, quantidade: 2 }],
    description: 'Lista de produtos e suas quantidades no pedido'
  })
  produtos: { productId: number; quantidade: number }[];

  @ApiProperty({
    example: 'Pendente',
    description: 'Status do pedido: Pendente, Concluído ou Cancelado',
    enum: ['Pendente', 'Concluído', 'Cancelado']
  })
  status: 'Pendente' | 'Concluído' | 'Cancelado';
}
