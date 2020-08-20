import { Test, TestingModule } from '@nestjs/testing';
import { CommentsProductController } from './comments-product.controller';

describe('CommentsProduct Controller', () => {
  let controller: CommentsProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsProductController],
    }).compile();

    controller = module.get<CommentsProductController>(CommentsProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
