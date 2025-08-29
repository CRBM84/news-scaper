import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsageLog } from './usage-log.entity';
import { UseLogData } from './usage-log.interface';
@Injectable()
export class UsageLogService {
    private readonly logger = new Logger(UsageLogService.name);
    constructor(
        @InjectRepository(UsageLog)
        private readonly usageLogRepository: Repository<UsageLog>,
    ) { }

    async logUseData(data: UseLogData): Promise<UsageLog> {
        try {
            const dataLogEntry = this.usageLogRepository.create(data);
            this.logger.log('Use data being saved...');
            return await this.usageLogRepository.save(dataLogEntry);

        } catch (error) {
            this.logger.error('Failed to long usage data', error);
            throw new InternalServerErrorException(
                'Failed to record data', { cause: error }
            );
        }
    }
}
