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

      const thirtyPosts = posts.slice(0, 30);
      const savedEntries = await this.postRepository.save(thirtyPosts);

      this.logger.log('Saved ' + savedEntries.length + ' new entries to local DB');

      return savedEntries;
    } catch (error) {
      this.logger.error('Error fetching data, please try again latter', error);
      throw new HttpException(
        'Failed to reach Hacker News',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  private isDataStale(lastestPost: Post): boolean {
    const FIVE_MINUTES = 5 * 60 * 1000;
    return Date.now() - lastestPost.createdAt.getTime() > FIVE_MINUTES;
  }

  private async getRecentArticles(): Promise<Post[]> {
    try {
      let posts = await this.postRepository.find({ order: { createdAt: 'DESC' }, take: 30 });
      if (posts.length || this.isDataStale(posts[0])) {
        this.logger.warn('No data or data is stale, fetching new data');
        await this.fetchNews();
        posts = await this.postRepository.find({ order: { createdAt: 'DESC' }, take: 30 });
      }
      return posts;
    } catch (error) {
      this.logger.error('Failed to fetch posts from db and Hacker News', error);
      throw new HttpException('Data unavailable', HttpStatus.SERVICE_UNAVAILABLE)
    }
  }

  async fetchLongTitles() { }

  async fetchShortTitles() { }


  //TODO: create helper method for freshness
  //TODO: call usage-log service in each method
  //TODO: define usage-long method/s
}
