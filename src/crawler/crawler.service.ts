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

      const posts = [];

      $('tr.athing').each((_, element) => {
        const rank = parseInt($(element).find('.rank').text().replace('.', ''));
        console.log(rank);
      })

      //TODO: update cheerio logic to scrape each element
      //TODO: save to local db for caching.
      //TODO: create helper method for freshness

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
