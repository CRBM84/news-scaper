import { Controller, Get } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { UsageLogService } from 'src/usage-log/usage-log.service';

@Controller('crawler')
export class CrawlerController {
    constructor(
        private readonly hackerNewsService: CrawlerService,
        private readonly usageLogService: UsageLogService,
    ) { }

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
