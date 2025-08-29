import { Controller, Get } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

@Controller('crawler')
export class CrawlerController {
    constructor(private readonly hackerNewsService: CrawlerService) { }

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
