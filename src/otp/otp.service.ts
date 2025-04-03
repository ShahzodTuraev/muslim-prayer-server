import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';
import { randomInt } from 'crypto';
import { Otp } from './otp.entity';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { OtpDto } from './dto/otp.dto';
import { SignupAuthDto } from 'src/auth/dto/signup.dto';
@Injectable()
export class OtpService {
  private readonly emailTransporter;
  constructor(
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
    private readonly usersService: UsersService,
  ) {
    // Initialize Nodemailer transporter for email
    this.emailTransporter = nodemailer.createTransport({
      host: process.env.EMAILER_HOST,
      port: process.env.EMAILER_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.EMAILER_USER,
        pass: process.env.EMAILER_PASS,
      },
    });
  }

  // Method to generate OTP
  private generateOtp(): string {
    const otp = randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
    return otp;
  }

  // Method to send OTP via email using Nodemailer
  async sendOtpToEmail(email: string): Promise<string> {
    const otp = this.generateOtp();

    try {
      // Send OTP via email
      // await this.emailTransporter.sendMail({
      //   from: 'mydayx24@gmail.com',
      //   to: email,
      //   subject: 'My Day OTP',
      //   text: `Your OTP is ${otp}`,
      //   html: `<p style="font-size: 16px">Assalomu alaykum  <br> Your OTP is <strong style="margin-left: 3px">${otp}</strong></p>`,
      // });
      await this.saveOtp(email, otp);
      return otp; // Return OTP to save it for verification
    } catch (error) {
      console.error('Error sending OTP via email', error);
      throw new Error('Failed to send OTP via email');
    }
  }
  async createOTP(email: OtpDto) {
    try {
      const result = await this.usersService.findUser('email', email.email);
      if (!result) {
        const res = await this.sendOtpToEmail(email.email);
        console.log(res);
        return { message: 'OTP sent successfully' };
      }

      return { message: 'This email is already in use' };
    } catch (error) {
      console.log('createOTP error:', error);
    }
  }
  async saveOtp(email: string, otp: string) {
    try {
      const salt = await bcrypt.genSalt();
      const otp_hash = await bcrypt.hash(otp, salt);
      const createdAt = new Date();
      const expiresAt = new Date(createdAt.getTime() + 3 * 60 * 1000); // 3 minutes later
      const otpData = this.otpRepository.create({ email, otp_hash, expiresAt });
      await this.otpRepository.save(otpData);
      return true;
    } catch (error) {
      console.log(error);
      throw new Error('OTP recording error');
    }
  }
  async otpCheck(dto: SignupAuthDto) {
    try {
      const otp_hash = await this.otpRepository.findOne({
        where: { email: dto.user_email, expiresAt: MoreThan(new Date()) },
        order: { createdAt: 'DESC' },
      });
      if (!otp_hash) {
        return false;
      }
      const isMatch = await bcrypt.compare(dto.otp, otp_hash.otp_hash);
      return isMatch;
    } catch (error) {
      throw new Error('OTP checking error:', error);
    }
  }
}
