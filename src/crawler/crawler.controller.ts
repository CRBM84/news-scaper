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

    public async requestHandler(endpoint: 'long_title' | 'short_title' | 'data_scrape', callback: () => Promise<any>) {

        const startTime = Date.now();
        let success = true;
        let errorMessage = 'No error';
        let resultCount = 0;
        const filterType = endpoint;

        try {
            const results = await callback();
            resultCount = results.length || 0;
            return results;
        } catch (error) {
            success = false;
            errorMessage = error.message || 'Unknown error';
        } finally {
            const responseTime = Date.now() - startTime;
            await this.usageLogService.logUseData({
                filterType,
                resultCount,
                success,
                errorMessage,
                responseTime
            })
        }
    }
}
