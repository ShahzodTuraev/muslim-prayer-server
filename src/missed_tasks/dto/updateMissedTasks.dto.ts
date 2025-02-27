import { IsNumber, IsOptional } from 'class-validator';

export class UpdateMissedTasksDto {
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
}
// Custom validation function to ensure at least one field is provided
import { validate } from 'class-validator';

export async function validateUpdateMissedTasksDto(dto: UpdateMissedTasksDto) {
  const errors = await validate(dto);
  if (errors.length > 0) {
    throw new Error('Invalid input data');
  }

  if (
    !dto.fajr &&
    dto.dhuhr === undefined &&
    dto.asr === undefined &&
    dto.maghrib === undefined &&
    dto.ishaa === undefined &&
    dto.vitr === undefined
  ) {
    throw new Error(
      'At least one code (01, 02, 03, 04, 05, 06) must be provided.',
    );
  }
}
