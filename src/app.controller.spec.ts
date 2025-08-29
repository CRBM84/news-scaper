import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getRoot', () => {
    it('should return HTML containing the documentation', () => {
      const result = appController.getRoot();
      expect(result).toContain('Hacker News API Documentation');
      expect(result).toContain('<h1');
      expect(result).toContain('/crawler/long-titles');
    });

    it('should call AppService.getRoot()', () => {
      const spy = jest.spyOn(appService, 'getRoot').mockReturnValue('<h1>Nest.js is fun</h1>');
      const result = appController.getRoot();
      expect(spy).toHaveBeenCalled();
      expect(result).toBe('<h1>Nest.js is fun</h1>');
    });
  });
});
