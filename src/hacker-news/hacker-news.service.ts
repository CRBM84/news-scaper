import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsageLog } from './entities/usage-log.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class HackerNewsService {
    private readonly logger = new Logger(HackerNewsService.name);
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        @InjectRepository(UsageLog)
        private readonly usageLogRepository: Repository<UsageLog>,
    ) { }

    //add helper methods here



    //service methods for endpoints
    async fetchNews() {
        this.logger.log('Fetching article list');

        try {
            const response = await axios.get('https://news.ycombinator.com/');
            this.logger.debug('Status: ' + response.status);

            return {};

        } catch (error) {
            this.logger.error('Error fetching data, please try again latter');
            throw new HttpException('Failed to reach Hacker News', HttpStatus.BAD_GATEWAY);
        }
    }

    async fetchLongTitles() {

    }

    async fetchShortTitles() {

    }
}
