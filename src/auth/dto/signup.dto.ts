import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class SignupAuthDto {
  @IsNotEmpty()
  @IsString()
  user_name: string;
  @IsEmail()
  user_email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  user_password: string;
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  otp: string;
  @IsString()
  city: string;
  @IsString()
  country: string;
  @IsNumber()
  latitude: number;
  @IsNumber()
  longitude: number;
}
