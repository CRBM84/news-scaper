import { Controller, Get } from '@nestjs/common';
import { HackerNewsService } from './hacker-news.service';

@Controller('hacker-news')
export class HackerNewsController {
    constructor(private readonly hackerNewsService: HackerNewsService) { }

    @Get('scrape')
    async getHackerNews() {
        return this.hackerNewsService.fetchNews();
    }

    @Get('long-titles')
    async getLongTitles() {
        return this.hackerNewsService.fetchLongTitles();
    }

    @Get('short-titles')
    async getShortTitles() {
        return this.hackerNewsService.fetchShortTitles();
    }
}
