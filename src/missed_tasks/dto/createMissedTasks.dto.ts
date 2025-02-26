import { IsNumber, IsOptional } from 'class-validator';

export class createMissedTasksDto {
  @IsOptional()
  @IsNumber()
  fajr: number;
  @IsOptional()
  @IsNumber()
  dhuhr: number;
  @IsOptional()
  @IsNumber()
  asr: number;
  @IsOptional()
  @IsNumber()
  maghrib: number;
  @IsOptional()
  @IsNumber()
  ishaa: number;
  @IsOptional()
  @IsNumber()
  vitr: number;
  @IsOptional()
  @IsNumber()
  fasting: number;
}
