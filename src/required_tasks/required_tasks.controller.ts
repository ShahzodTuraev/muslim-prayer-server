import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { RequiredTasksService } from './required_tasks.service';
import { createRequiredTasksDto } from './dto/createRequiredTasks.dto';

@Controller('required-tasks')
export class RequiredTasksController {
  constructor(private readonly RequiredTasksService: RequiredTasksService) {}
  @HttpCode(HttpStatus.OK)
  @Post('create')
  async createRequiredTasks(
    @Request() req: any,
    @Body(ValidationPipe) createRequiredTasksDto: createRequiredTasksDto,
  ) {
    return this.RequiredTasksService.createRequiredTasks(
      req.user.user_id,
      createRequiredTasksDto,
    );
  }
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  async deleteRequiredTasks(@Request() req: any, @Param('id') id: string) {
    return this.RequiredTasksService.deleteRequiredTasks(req.user.user_id, id);
  }
  @HttpCode(HttpStatus.OK)
  @Get(':type')
  async getTasksList(
    @Request() req: any,
    @Param('type') type: 'day' | 'week' | 'month' | 'year',
  ) {
    return this.RequiredTasksService.getTasksByRange(req.user.user_id, type);
  }
}
