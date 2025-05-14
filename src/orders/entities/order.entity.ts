import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  produtos: { productId: number; quantidade: number }[];

  @Column('decimal')
  total_pedido: number;

  @Column()
  status: 'Pendente' | 'Concluído' | 'Cancelado';
}
