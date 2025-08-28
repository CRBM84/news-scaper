import { Module } from '@nestjs/common';
import { HackerNewsController } from './hacker-news.controller';
import { HackerNewsService } from './hacker-news.service';

@Module({
  controllers: [HackerNewsController],
  providers: [HackerNewsService]
})
export class HackerNewsModule {}
