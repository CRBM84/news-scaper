import { Module } from '@nestjs/common';
import { UsageLogService } from './usage-log.service';
import { UsageLog } from './usage-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsageLog])
  ],
  providers: [UsageLogService]
})
export class UsageLogModule { }
