import { RequiredTasksService } from './../required_tasks/required_tasks.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { format } from 'date-fns';
import {
  ApiResponse,
  PrayerTimings,
} from 'src/interfaces/prayer_time.interface';
import { RequiredTasks } from 'src/required_tasks/required_tasks.entity';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class PrayerTimeService {
  constructor(
    private usersService: UsersService,
    private RequiredTasksService: RequiredTasksService,
  ) {}
  private readonly apiUrl = process.env.PRAYER_API || '';
  prayerTimeList(fixedTime: PrayerTimings, checkedTime: RequiredTasks[]) {
    const prayerlist = [
      {
        id: '01',
        prayer: 'Fajr',
        time: fixedTime.Fajr,
        sunrise: fixedTime.Sunrise,
        checked:
          checkedTime.find((ele) => ele.req_task_code == '01')?.req_task_id ||
          null,
      },
      {
        id: '02',
        prayer: 'Dhuhr',
        time: fixedTime.Dhuhr,
        checked:
          checkedTime.find((ele) => ele.req_task_code == '02')?.req_task_id ||
          null,
      },
      {
        id: '03',
        prayer: 'Asr',
        time: fixedTime.Asr,
        checked:
          checkedTime.find((ele) => ele.req_task_code == '03')?.req_task_id ||
          null,
      },
      {
        id: '04',
        prayer: 'Maghrib',
        time: fixedTime.Maghrib,
        checked:
          checkedTime.find((ele) => ele.req_task_code == '04')?.req_task_id ||
          null,
      },
      {
        id: '05',
        prayer: 'Isha',
        time: fixedTime.Isha,
        checked:
          checkedTime.find((ele) => ele.req_task_code == '05')?.req_task_id ||
          null,
      },
    ];
    return prayerlist;
  }
  async fetchPrayerTime(user_id: string): Promise<any> {
    try {
      const today = format(new Date(), 'dd-MM-yyyy');
      const user = await this.usersService.findUser('user_id', user_id);
      const requiredTaskList = await this.RequiredTasksService.getTasksByRange(
        user_id,
        'day',
      );
      const response = await axios.get<ApiResponse>(
        `${this.apiUrl}/${today}?address=${user?.city},${user?.country.replace(/\s+/g, '')}&method=${user?.prayer_method}&school=${user?.prayer_school}`,
      );

      const prayerTime = this.prayerTimeList(
        response.data.data.timings,
        requiredTaskList,
      );

      return prayerTime;
    } catch (error) {
      console.error('Error fetching data from external API:', error);
      throw error;
    }
  }
}
