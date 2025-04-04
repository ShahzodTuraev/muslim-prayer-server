import { Test, TestingModule } from '@nestjs/testing';
import { PrayerTimeService } from './prayer_time.service';

describe('PrayerTimeService', () => {
  let service: PrayerTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrayerTimeService],
    }).compile();

    service = module.get<PrayerTimeService>(PrayerTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
