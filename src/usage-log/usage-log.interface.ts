export interface UseLogData {
    filterType: 'long_title' | 'short_title' | 'data_scrape';
    resultCount?: number;
    success: boolean;
    errorMessage?: string;
    responseTime?: number;
}