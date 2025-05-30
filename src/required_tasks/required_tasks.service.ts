import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequiredTasks } from './required_tasks.entity';
import { Between, MoreThan, Repository } from 'typeorm';
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
        return '';
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
      console.log(err);
      throw err;
    }
  }
  async deleteRequiredTasks(createId: string, req_task_id: string) {
    try {
      await this.requiredTasksRepository
        .createQueryBuilder('required_tasks')
        .delete()
        .where('req_task_id= :req_task_id', { req_task_id })
        .andWhere('createId=:createId', { createId })
        .execute();
      return { message: 'task deleted' };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  getCurrentWeekRange(type: string) {
    if (type == 'week') {
      const today = new Date();
      const firstDay = new Date(today);
      const lastDay = new Date(today);
      // Adjusting to start from Monday (ISO week starts on Monday)
      const dayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
      const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      firstDay.setDate(today.getDate() + diffToMonday); // Set to Monday
      firstDay.setHours(0, 0, 0, 0); // Set to start of the day
      lastDay.setDate(firstDay.getDate() + 6); // Set to Sunday
      lastDay.setHours(23, 59, 59, 999); // Set to end of the day
      return {
        startDate: firstDay.toISOString(),
        endDate: lastDay.toISOString(),
      };
    }
  }
  async getTasksWeek(
    createId: string,
    range: 'day' | 'week' | 'month' | 'year',
  ) {
    const result = await this.requiredTasksRepository
      .createQueryBuilder('required_tasks')
      .where(
        'task.createAt BETWEEN :startDate AND :endDate',
        this.getCurrentWeekRange(range),
      )
      .andWhere('createId=:createId', { createId })
      .getMany();
    return result;
  }
  async getTasksByRange(
    user_id: string,
    range: 'day' | 'week' | 'month' | 'year',
  ) {
    let date = new Date();
    switch (range) {
      case 'day':
        date.setDate(date.getDate() - 1);
        break;
      case 'week':
        date.setDate(date.getDate() - 7);
        break;
      case 'month':
        date.setMonth(date.getMonth() - 1);
        break;
      case 'year':
        date.setFullYear(date.getFullYear() - 1);
        break;
      default:
        throw new Error('Invalid range');
    }

    return this.requiredTasksRepository.find({
      where: {
        createId: user_id,
        createdAt: MoreThan(date),
      },
      order: { createdAt: 'DESC' },
    });
  }
}
