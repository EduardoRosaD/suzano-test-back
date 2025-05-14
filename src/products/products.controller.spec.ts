import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                nome: 'Mouse',
                categoria: 'Periféricos',
                descricao: 'Mouse sem fio',
                preco: 150,
                quantidade_estoque: 10,
              },
            ]),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ✅ Teste 1: Deve retornar todos os produtos
  it('should return all products', async () => {
    const result = await controller.findAll();
    expect(result).toHaveLength(1);
    expect(result[0].nome).toEqual('Mouse');
  });

  // ✅ Teste 2: Deve criar um produto
  it('should create a product', async () => {
    const dto = {
      nome: 'Teclado',
      categoria: 'Periféricos',
      descricao: 'Teclado mecânico',
      preco: 300,
      quantidade_estoque: 5,
    };
    const result = await controller.create(dto);
    expect(result).toEqual({ id: 1, ...dto });
  });
});
