import { Test, TestingModule } from '@nestjs/testing';
import { MissedTasksService } from './missed_tasks.service';

describe('MissedTasksService', () => {
  let service: MissedTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MissedTasksService],
    }).compile();

    service = module.get<MissedTasksService>(MissedTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
