import { PrayerTimeService } from './prayer_time.service';
import { Controller, Get, HttpCode, HttpStatus, Request } from '@nestjs/common';

@Controller('prayer-time')
export class PrayerTimeController {
  constructor(private readonly PrayerTimeService: PrayerTimeService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  async getPrayerTime(@Request() req: any) {
    return await this.PrayerTimeService.fetchPrayerTime(req.user.user_id);
  }
}
