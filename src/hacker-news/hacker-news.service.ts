import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsageLog } from './entities/usage-log.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class HackerNewsService {

    //add helper methods here



    //service methods for endpoints
    async fetchNews() {

    }

    async fetchLongTitles() {

    }

    async fetchShortTitles() {

    }
}
