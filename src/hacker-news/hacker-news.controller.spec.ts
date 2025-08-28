import { Test, TestingModule } from '@nestjs/testing';
import { HackerNewsController } from './hacker-news.controller';

describe('HackerNewsController', () => {
  let controller: HackerNewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HackerNewsController],
    }).compile();

    controller = module.get<HackerNewsController>(HackerNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
