import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class createRequiredTasksDto {
  @IsNotEmpty()
  @IsEnum(['01', '02', '03', '04', '05', '06', '00'])
  req_task_code: string;
  @IsNotEmpty()
  @IsEnum(['fajr', 'dhuhr', 'asr', 'maghrib', 'ishaa', 'vitr', 'fasting'])
  req_task_name: string;
}
