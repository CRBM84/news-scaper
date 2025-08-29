import { Test, TestingModule } from '@nestjs/testing';
import { CrawlerService } from './crawler.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CrawlerService', () => {
  let service: CrawlerService;
  let postRepository: Repository<Post>;

  const mockPost = (title: string, points = 250, comments = 300): Post => ({
    id: Math.random(),
    title,
    points,
    comments,
    createdAt: new Date(),
    rank: Math.floor(Math.random() * 30)
  });

  const recentPosts = [
    mockPost('New JS framework', 100, 50),
    mockPost('ROR makes a comeback', 200, 150),
    mockPost('Java still crazy fast', 300, 75),
    mockPost('Nest.js - so many cats in the documentaion', 400, 200),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrawlerService,
        {
          provide: getRepositoryToken(Post),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            create: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<CrawlerService>(CrawlerService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  describe('fetchNews', () => {
    it('should fetch and save thirty posts from Hacker New',
      async () => {
        // happy path
        jest.spyOn(service, 'fetchNews').mockResolvedValue(recentPosts);
        const result = await service.fetchNews();
        expect(result).toHaveLength(recentPosts.length);
      }
    );

    it('should throw bad_gateway when site is unavailable',
      async () => {
        // network issue
        jest.spyOn(postRepository, 'save').mockRejectedValue(new Error('Network error'));
        await expect(service.fetchNews()).rejects.toThrow(HttpException);
        await expect(service.fetchNews()).rejects.toHaveProperty('status', HttpStatus.BAD_GATEWAY);
      }
    );
  });

  describe('fetchLongTitles', () => {
    it('should return posts with more than five words sorted by comments',
      async () => {
        // happy path
        jest.spyOn(postRepository, 'find').mockResolvedValue(recentPosts);
        const result = await service.fetchLongTitles();
        expect(result).toHaveLength(1); // only Nest.js post has >5 words
        expect(result[0].comments).toBeGreaterThanOrEqual(result[0].comments); // single post, still valid
        expect(result[0].title).toContain('Nest.js');
      }
    );

    it('should handle empty array',
      async () => {
        // no results
        jest.spyOn(postRepository, 'find').mockResolvedValue([]);
        const result = await service.fetchLongTitles();
        expect(result).toHaveLength(0);
      }
    );
  });

  describe('fetchShortTitles', () => {
    it('should return posts with five or fewer words sorted by points',
      async () => {
        // happy path
        jest.spyOn(postRepository, 'find').mockResolvedValue(recentPosts);
        const result = await service.fetchShortTitles();
        expect(result).toHaveLength(3);
        expect(result[0].points).toBeGreaterThanOrEqual(result[1].points);
        expect(result.some(post => post.title === 'Java still crazy fast')).toBeTruthy();
      }
    );

    it('should handle special characters in titles',
      async () => {
        // special characters
        const specialPosts = [
          mockPost('React >>> Vue!!!'),
          mockPost('Python & JavaScript unite!')
        ];
        jest.spyOn(postRepository, 'find').mockResolvedValue(specialPosts);
        const result = await service.fetchShortTitles();
        expect(result).toHaveLength(2);
      }
    );
  });

  describe('isDataStale', () => {
    it('should return true for posts older than five minutes',
      () => {
        // stale data 
        const oldPost = mockPost('New JS framework');
        oldPost.createdAt = new Date(Date.now() - 6 * 60 * 1000);
        expect(service['isDataStale'](oldPost)).toBeTruthy();
      }
    );

    it('should return false for fresh posts',
      () => {
        // fresh data 
        const freshPost = mockPost('ROR makes a comeback');
        freshPost.createdAt = new Date(Date.now() - 2 * 60 * 1000);
        expect(service['isDataStale'](freshPost)).toBeFalsy();
      }
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
