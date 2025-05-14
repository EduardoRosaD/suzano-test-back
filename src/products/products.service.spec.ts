import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: {
            findByName: jest.fn().mockResolvedValue(null), // Adicione isso
            create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
            findAll: jest.fn().mockResolvedValue([]),
          },
        }        
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const dto = {
      nome: 'Mouse',
      categoria: 'Periféricos',
      descricao: 'Mouse sem fio',
      preco: 150,
      quantidade_estoque: 20,
    };

    const result = await service.create(dto);
    expect(result).toEqual(dto);
  });
});
