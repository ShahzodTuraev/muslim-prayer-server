import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MissedTasks } from './missed_tasks.entity';
import { Repository } from 'typeorm';
import { createMissedTasksDto } from './dto/createMissedTasks.dto';
import { UpdateMissedTasksDto } from './dto/updateMissedTasks.dto';

@Injectable()
export class MissedTasksService {
  constructor(
    @InjectRepository(MissedTasks)
    private readonly missedTasksRepository: Repository<MissedTasks>,
  ) {}
  async createMissedTasks(user_id: string, dto: createMissedTasksDto) {
    try {
      const missedTasks = this.missedTasksRepository.create(dto);
      const checkDbForUniqueUserId = await this.missedTasksRepository.findOne({
        where: { createId: user_id },
      });
      if (!!checkDbForUniqueUserId) {
        return { message: 'You have already insert your missed tasks count' };
      }
      return await this.missedTasksRepository.save({
        ...missedTasks,
        createId: user_id,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateMissedTasks(
    user_id: string,
    task_id: string,
    dto: UpdateMissedTasksDto,
  ): Promise<{ message: string }> {
    try {
      await this.missedTasksRepository.update(
        { createId: user_id, task_id },
        { ...dto },
      );
      return { message: `${task_id} task is updated` };
    } catch (error) {
      throw error;
    }
  }
}
