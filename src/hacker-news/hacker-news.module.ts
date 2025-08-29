import { Module } from '@nestjs/common';
import { HackerNewsController } from './hacker-news.controller';
import { HackerNewsService } from './hacker-news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageLog } from './entities/usage-log.entity';
import { Post } from './entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, UsageLog])
  ],
  controllers: [HackerNewsController],
  providers: [HackerNewsService],
})
export class HackerNewsModule { }
