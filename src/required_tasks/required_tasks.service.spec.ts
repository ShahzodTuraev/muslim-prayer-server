import { Test, TestingModule } from '@nestjs/testing';
import { RequiredTasksService } from './required_tasks.service';

describe('RequiredTasksService', () => {
  let service: RequiredTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequiredTasksService],
    }).compile();

    service = module.get<RequiredTasksService>(RequiredTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
