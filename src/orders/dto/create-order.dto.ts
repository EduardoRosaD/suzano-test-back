export class CreateOrderDto {
  produtos: { productId: number; quantidade: number }[];
  status: 'Pendente' | 'Concluído' | 'Cancelado';
}
