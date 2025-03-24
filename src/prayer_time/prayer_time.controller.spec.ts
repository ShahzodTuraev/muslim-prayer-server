import { Test, TestingModule } from '@nestjs/testing';
import { PrayerTimeController } from './prayer_time.controller';

describe('PrayerTimeController', () => {
  let controller: PrayerTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrayerTimeController],
    }).compile();

    controller = module.get<PrayerTimeController>(PrayerTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
