import { IsNumber } from 'class-validator';

export class createMissedTasksDto {
  @IsNumber()
  fajr: number;
  @IsNumber()
  dhuhr: number;
  @IsNumber()
  asr: number;
  @IsNumber()
  maghrib: number;
  @IsNumber()
  ishaa: number;
  @IsNumber()
  vitr: number;
  @IsNumber()
  fasting: number;
}
