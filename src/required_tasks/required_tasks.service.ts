import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequiredTasks } from './required_tasks.entity';
import { Between, Repository } from 'typeorm';
import { createRequiredTasksDto } from './dto/createRequiredTasks.dto';

@Injectable()
export class RequiredTasksService {
  constructor(
    @InjectRepository(RequiredTasks)
    private readonly requiredTasksRepository: Repository<RequiredTasks>,
  ) {}
  taskName(task_code: string) {
    switch (task_code) {
      case '01':
        return 'fajr';
        break;
      case '02':
        return 'dhuhr';
        break;
      case '03':
        return 'asr';
        break;
      case '04':
        return 'maghrib';
        break;
      case '05':
        return 'ishaa';
        break;
      default:
        '';
    }
  }
  async createRequiredTasks(
    user_id: string,
    dto: createRequiredTasksDto,
  ): Promise<RequiredTasks> {
    try {
      // Get today's date at 00:00:00
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Check if a task already exists for this user today
      const existingTask = await this.requiredTasksRepository.findOne({
        where: {
          req_task_name: this.taskName(dto.req_task_code),
          createId: user_id,
          createdAt: Between(today, new Date(today.getTime() + 86400000)), // Between today 00:00 and tomorrow 00:00
        },
      });
      if (existingTask) {
        throw new BadRequestException(
          `You have already done today's ${existingTask.req_task_name}.`,
        );
      }
      // Insert the new task
      const task = this.requiredTasksRepository.create({
        req_task_code: dto.req_task_code,
        req_task_name: this.taskName(dto.req_task_code),
        createId: user_id,
      });

      return this.requiredTasksRepository.save(task);
    } catch (err) {
      throw err;
    }
  }
  async getRequiredTasks(range: 'week' | 'month' | 'year', user_id: string) {
    try {
    } catch (err) {
      throw err;
    }
  }
}
