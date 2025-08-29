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
        return this.requestHandler('data_scrape', () => this.hackerNewsService.fetchNews());
    }

    @Get('long-titles')
    async getLongTitles() {
        return this.requestHandler('long_title', () => this.hackerNewsService.fetchLongTitles());
    }

    @Get('short-titles')
    async getShortTitles() {
        return this.requestHandler('short_title', () => this.hackerNewsService.fetchShortTitles());
    }

    public async requestHandler(endpoint: string, callback: () => Promise<any>) {
        //need start + stop time, success, error, result pass to logUseData 
        //response in ms
    }
}
