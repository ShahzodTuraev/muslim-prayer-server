import { Module } from '@nestjs/common';
import { MissedTasksController } from './missed_tasks.controller';
import { MissedTasksService } from './missed_tasks.service';
import { MissedTasks } from './missed_tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MissedTasks])],
  controllers: [MissedTasksController],
  providers: [MissedTasksService],
})
export class MissedTasksModule {}
