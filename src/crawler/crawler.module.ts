import { Module } from '@nestjs/common';
import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageLog } from '../usage-log/usage-log.entity';
import { UsageLogService } from '../usage-log/usage-log.service';
import { Post } from './post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, UsageLog])
  ],
  controllers: [CrawlerController],
  providers: [CrawlerService, UsageLogService],
})
export class CrawlerModule { }
