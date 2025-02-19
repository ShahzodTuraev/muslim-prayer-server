import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class SigninAuthDto {
  @IsEmail()
  user_email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  user_password: string;
}
