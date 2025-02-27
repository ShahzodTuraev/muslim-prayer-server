import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
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
}
