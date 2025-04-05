import { Module } from '@nestjs/common';
import { RequiredTasksController } from './required_tasks.controller';
import { RequiredTasksService } from './required_tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequiredTasks } from './required_tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequiredTasks])],
  exports: [RequiredTasksService],
  controllers: [RequiredTasksController],
  providers: [RequiredTasksService],
})
export class RequiredTasksModule {}
