import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HackerNewsModule } from './hacker-news/hacker-news.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.sqlite',
      entities: [],
      synchronize: true,
    }),
    HackerNewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
