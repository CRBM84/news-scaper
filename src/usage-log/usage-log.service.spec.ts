import { Test, TestingModule } from '@nestjs/testing';
import { UsageLogService } from './usage-log.service';

describe('UsageLogService', () => {
  let service: UsageLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsageLogService],
    }).compile();

    service = module.get<UsageLogService>(UsageLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
