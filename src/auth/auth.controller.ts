import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupAuthDto } from './dto/signup.dto';
import { SigninAuthDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body(ValidationPipe) signUpDto: SignupAuthDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body(ValidationPipe) signInDto: SigninAuthDto) {
    return this.authService.signIn(signInDto);
  }
}
