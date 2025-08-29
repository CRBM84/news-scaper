import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot(): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">Hacker News API Documentation</h1>
        
        <div style="background: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 8px; border: 1px solid #eee;">
          <h2 style="color: #444; margin-top: 0;">GET /api/long-titles</h2>
          <p style="color: #666;">Returns Hacker News posts with titles longer than five words</p>
          <a href="/api/long-titles" style="color: #007bff; text-decoration: none; padding: 5px 10px; border: 1px solid #007bff; border-radius: 4px;">Try it →</a>
        </div>

        <div style="background: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 8px; border: 1px solid #eee;">
          <h2 style="color: #444; margin-top: 0;">GET /api/short-titles</h2>
          <p style="color: #666;">Returns Hacker News posts with titles shorter than five words</p>
          <a href="/api/short-titles" style="color: #007bff; text-decoration: none; padding: 5px 10px; border: 1px solid #007bff; border-radius: 4px;">Try it →</a>
        </div>

        <div style="background: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 8px; border: 1px solid #eee;">
          <h2 style="color: #444; margin-top: 0;">GET /api/scrape</h2>
          <p style="color: #666;">Triggers a new data scrape from Hacker News, saves to local DB</p>
          <a href="/api/scrape" style="color: #007bff; text-decoration: none; padding: 5px 10px; border: 1px solid #007bff; border-radius: 4px;">Run Scraper →</a>
        </div>
      </div>
    `;
  }
}
