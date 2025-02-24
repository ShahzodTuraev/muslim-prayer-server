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
  @IsOptional()
  @IsNumber()
  fasting: number;
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
    dto.vitr === undefined &&
    dto.fasting === undefined
  ) {
    throw new Error(
      'At least one field (product_name, product_price, or product_count) must be provided.',
    );
  }
}
