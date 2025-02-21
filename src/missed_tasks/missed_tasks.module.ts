import { Module } from '@nestjs/common';
import { MissedTasksController } from './missed_tasks.controller';
import { MissedTasksService } from './missed_tasks.service';

@Module({
  controllers: [MissedTasksController],
  providers: [MissedTasksService]
})
export class MissedTasksModule {}
