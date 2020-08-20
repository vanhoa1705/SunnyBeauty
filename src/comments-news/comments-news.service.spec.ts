import { Test, TestingModule } from '@nestjs/testing';
import { CommentsNewsService } from './comments-news.service';

describe('CommentsNewsService', () => {
  let service: CommentsNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsNewsService],
    }).compile();

    service = module.get<CommentsNewsService>(CommentsNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
