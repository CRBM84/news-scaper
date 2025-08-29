import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Post } from './crawler/post.entity';
import { UsageLog } from './usage-log/usage-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlerModule } from './crawler/crawler.module';
import { UsageLogModule } from './usage-log/usage-log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.sqlite',
      entities: [UsageLog, Post],
      synchronize: true,
    }),
    CrawlerModule,
    UsageLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
