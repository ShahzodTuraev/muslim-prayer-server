import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupAuthDto } from './dto/signup.dto';
import { SigninAuthDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { OtpService } from 'src/otp/otp.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private otpService: OtpService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignupAuthDto): Promise<any> {
    const isMatch = await this.otpService.otpCheck(dto);
    if (!isMatch) {
      return { isOtpCorrect: false, access_token: null };
    }
    const user = await this.usersService.createUser(dto);
    const payload = { user_id: user.user_id };
    const jwtToken = await this.createToken(payload);
    return { isOtpCorrect: true, access_token: jwtToken.access_token };
  }
  async signIn(dto: SigninAuthDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findUser('email', dto.user_email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(dto.user_password, user.user_password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { user_id: user.user_id };
    const jwtToken = await this.createToken(payload);
    return jwtToken;
  }
  async createToken(payload: { user_id: string }) {
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '180d',
      }),
    };
  }
}
