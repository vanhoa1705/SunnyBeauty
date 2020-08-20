import { Test, TestingModule } from '@nestjs/testing';
import { CommentsNewsController } from './comments-news.controller';

describe('CommentsNews Controller', () => {
  let controller: CommentsNewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsNewsController],
    }).compile();

    controller = module.get<CommentsNewsController>(CommentsNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
