import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsageLog } from '../usage-log/usage-log.entity';
import { Post } from './post.entity';

@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(UsageLog)
    private readonly usageLogRepository: Repository<UsageLog>,
  ) { }

  async fetchNews() {
    this.logger.log('Fetching article list');

    try {
      const response = await axios.get('https://news.ycombinator.com/');
      this.logger.debug('Status: ' + response.status);
      const $ = cheerio.load(response.data);

      const posts: Array<{ rank: number; title: string; points: number; comments: number; createdAt: Date }> = [];

      $('tr.athing').each((_, element) => {
        const rank: number = parseInt($(element).find('.rank').text().replace('.', ''));
        const title: string = $(element).find('.titleline > a').text();

        const subTextRow = $(element).next();
        const points: number = parseInt(subTextRow.find('.score').text().replace('points', ''));

        const comments: number = parseInt(subTextRow.find('a').last().text()) || 0; //TODO: consider change to .find comments in case ui is updated

        posts.push({ rank, title, points, comments, createdAt: new Date() });

      })
      console.log(posts);

      //TODO: save to local db for caching.
      //TODO: create helper method for freshness
      //TODO: call usage-log service in each method
      //TODO: define usage-long method/s

      return {};
    } catch (error) {
      this.logger.error('Error fetching data, please try again latter', error);
      throw new HttpException(
        'Failed to reach Hacker News',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async fetchLongTitles() { }

  async fetchShortTitles() { }
}
