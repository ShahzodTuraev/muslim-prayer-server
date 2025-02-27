import { IsEnum, IsNotEmpty } from 'class-validator';

export class createRequiredTasksDto {
  @IsNotEmpty()
  @IsEnum(['01', '02', '03', '04', '05', '06', '00'], {
    message: 'Valid type required',
  })
  req_task_code: string;
}
