import { Test, TestingModule } from '@nestjs/testing';
import { MissedTasksController } from './missed_tasks.controller';

describe('MissedTasksController', () => {
  let controller: MissedTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MissedTasksController],
    }).compile();

    controller = module.get<MissedTasksController>(MissedTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
