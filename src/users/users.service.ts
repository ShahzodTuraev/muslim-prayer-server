import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { SignupAuthDto } from 'src/auth/dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { SigninAuthDto } from 'src/auth/dto/signin.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(dto: SignupAuthDto) {
    try {
      const salt = await bcrypt.genSalt();
      dto.user_password = await bcrypt.hash(dto.user_password, salt);
      const user = this.userRepository.create(dto);
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('This email is already in use');
      }
      throw new BadRequestException('Something went wrong');
    }
  }
  async findUser(dto: SigninAuthDto) {
    try {
      return this.userRepository.findOneBy({
        user_email: dto.user_email,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getUsers() {
    try {
      return await this.userRepository.find({
        select: ['user_id', 'user_name', 'user_email', 'create_date'],
        order: {
          create_date: 'ASC', // Sorts in correct insertion order
        },
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('This email is already in use');
      }
      throw new BadRequestException('Something went wrong');
    }
  }
}
