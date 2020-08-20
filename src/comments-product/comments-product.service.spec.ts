import { Test, TestingModule } from '@nestjs/testing';
import { CommentsProductService } from './comments-product.service';

describe('CommentsProductService', () => {
  let service: CommentsProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsProductService],
    }).compile();

    service = module.get<CommentsProductService>(CommentsProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
