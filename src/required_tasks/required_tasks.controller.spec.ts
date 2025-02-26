import { Test, TestingModule } from '@nestjs/testing';
import { RequiredTasksController } from './required_tasks.controller';

describe('RequiredTasksController', () => {
  let controller: RequiredTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequiredTasksController],
    }).compile();

    controller = module.get<RequiredTasksController>(RequiredTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
