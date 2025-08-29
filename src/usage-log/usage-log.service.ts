import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsageLog } from './usage-log.entity';
@Injectable()
export class UsageLogService {
    private readonly logger = new Logger(UsageLogService.name);
    constructor(
        @InjectRepository(UsageLog)
        private readonly usageLogRepository: Repository<UsageLog>,
    ) { }
}
