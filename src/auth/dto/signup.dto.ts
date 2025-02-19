import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class SignupAuthDto {
  @IsNotEmpty()
  @IsString()
  user_name: string;
  @IsEmail()
  user_email: string;
  @IsEnum(['USER', 'ADMIN'], { message: 'Valid type required' })
  user_type: 'USER' | 'ADMIN';
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  user_password: string;
}
