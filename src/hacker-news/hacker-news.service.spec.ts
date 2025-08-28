import { Test, TestingModule } from '@nestjs/testing';
import { HackerNewsService } from './hacker-news.service';

describe('HackerNewsService', () => {
  let service: HackerNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HackerNewsService],
    }).compile();

    service = module.get<HackerNewsService>(HackerNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
