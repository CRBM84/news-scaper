import { Test, TestingModule } from '@nestjs/testing';
import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { UsageLogService } from '../usage-log/usage-log.service';
import { InternalServerErrorException } from '@nestjs/common';

describe('CrawlerController', () => {
  let controller: CrawlerController;
  let mockCrawlerService: any;
  let mockUsageLogService: any;

  beforeEach(async () => {
    mockCrawlerService = {
      fetchNews: jest.fn(),
      fetchLongTitles: jest.fn(),
      fetchShortTitles: jest.fn(),
    };

    mockUsageLogService = {
      logUseData: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrawlerController],
      providers: [
        { provide: CrawlerService, useValue: mockCrawlerService },
        { provide: UsageLogService, useValue: mockUsageLogService },
      ],
    }).compile();

    controller = module.get<CrawlerController>(CrawlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHackerNews', () => {
    it('should call fetchNews and log usage', async () => {
      mockCrawlerService.fetchNews.mockResolvedValue(['HN1', 'HN2']);
      const result = await controller.getHackerNews();
      expect(result).toEqual(['HN1', 'HN2']);
      expect(mockCrawlerService.fetchNews).toHaveBeenCalled();
      expect(mockUsageLogService.logUseData).toHaveBeenCalledWith(
        expect.objectContaining({
          filterType: 'data_scrape',
          resultCount: 2,
          success: true,
          errorMessage: 'No error',
        }),
      );
    });

    it('should handle errors', async () => {
      mockCrawlerService.fetchNews.mockRejectedValue(new Error('Network error'));
      await expect(controller.getHackerNews()).rejects.toThrow(InternalServerErrorException);
      expect(mockUsageLogService.logUseData).toHaveBeenCalledWith(
        expect.objectContaining({
          filterType: 'data_scrape',
          success: false,
          errorMessage: 'Network error',
        }),
      );
    });
  });

  describe('getLongTitles', () => {
    it('should call fetchLongTitles and log usage', async () => {
      mockCrawlerService.fetchLongTitles.mockResolvedValue(['long title']);
      const result = await controller.getLongTitles();
      expect(result).toEqual(['long title']);
      expect(mockCrawlerService.fetchLongTitles).toHaveBeenCalled();
      expect(mockUsageLogService.logUseData).toHaveBeenCalledWith(
        expect.objectContaining({
          filterType: 'long_title',
          resultCount: 1,
          success: true,
        }),
      );
    });
  });

  describe('getShortTitles', () => {
    it('should call fetchShortTitles and log usage', async () => {
      mockCrawlerService.fetchShortTitles.mockResolvedValue(['short title']);
      const result = await controller.getShortTitles();
      expect(result).toEqual(['short title']);
      expect(mockCrawlerService.fetchShortTitles).toHaveBeenCalled();
      expect(mockUsageLogService.logUseData).toHaveBeenCalledWith(
        expect.objectContaining({
          filterType: 'short_title',
          resultCount: 1,
          success: true,
        }),
      );
    });
  });
});
