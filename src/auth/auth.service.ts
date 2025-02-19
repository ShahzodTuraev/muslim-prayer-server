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
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignupAuthDto): Promise<any> {
    const user = await this.usersService.createUser(dto);

    const payload = { user_id: user.user_id };
    const jwtToken = await this.createToken(payload);
    return user;
  }
  async signIn(dto: SigninAuthDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findUser(dto);
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
    try {
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '1d',
        }),
      };
    } catch (error) {
      throw error;
    }
  }
}
