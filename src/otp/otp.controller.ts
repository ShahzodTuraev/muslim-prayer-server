import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpDto } from './dto/otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}
  @HttpCode(HttpStatus.OK)
  @Post()
  async sendOtp(@Body(ValidationPipe) emailDto: OtpDto) {
    const result = await this.otpService.createOTP(emailDto);
    return result;
  }
}
