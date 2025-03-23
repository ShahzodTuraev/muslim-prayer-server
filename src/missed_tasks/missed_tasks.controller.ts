import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { MissedTasksService } from './missed_tasks.service';
import { createMissedTasksDto } from './dto/createMissedTasks.dto';
import {
  UpdateMissedTasksDto,
  validateUpdateMissedTasksDto,
} from './dto/updateMissedTasks.dto';
//ready for data fetching
@Controller('missed-tasks')
export class MissedTasksController {
  constructor(private readonly MissedTasksService: MissedTasksService) {}
  @HttpCode(HttpStatus.OK)
  @Post('create')
  async createMissedTasks(
    @Request() req: any,
    @Body(ValidationPipe) createMissedTasksDto: createMissedTasksDto,
  ) {
    return this.MissedTasksService.createMissedTasks(
      req.user.user_id,
      createMissedTasksDto,
    );
  }

  @Patch('update/:task_id')
  async updateMissedTasks(
    @Param('task_id') task_id: string,
    @Request() req: any,
    @Body(ValidationPipe) updateMissedTasksDto: UpdateMissedTasksDto,
  ): Promise<{ message: string }> {
    await validateUpdateMissedTasksDto(updateMissedTasksDto);
    return this.MissedTasksService.updateMissedTasks(
      req.user.user_id,
      task_id,
      updateMissedTasksDto,
    );
  }
}
