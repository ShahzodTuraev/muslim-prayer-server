import { Module } from '@nestjs/common';
import { RequiredTasksController } from './required_tasks.controller';
import { RequiredTasksService } from './required_tasks.service';

@Module({
  controllers: [RequiredTasksController],
  providers: [RequiredTasksService]
})
export class RequiredTasksModule {}
