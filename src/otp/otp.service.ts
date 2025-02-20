import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';
import { randomInt } from 'crypto';
import { Otp } from './otp.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class OtpService {
  private readonly emailTransporter;
  constructor(
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
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
      await this.emailTransporter.sendMail({
        from: 'mydayx24@gmail.com',
        to: email,
        subject: 'My Day OTP kod',
        text: `Your OTP is ${otp}`,
        html: `<p style="font-size: 16px">Assalomu alaykum  <br> Your OTP is <strong style="letter-spacing: 2px; margin-left: 3px">${otp}</strong></p>`,
      });
      await this.createOtp(email, otp);
      return otp; // Return OTP to save it for verification
    } catch (error) {
      console.error('Error sending OTP via email', error);
      throw new Error('Failed to send OTP via email');
    }
  }
  async createOtp(email: string, otp: string) {
    try {
      const salt = await bcrypt.genSalt();
      const otp_hash = await bcrypt.hash(otp, salt);
      const createdAt = new Date();
      const expiresAt = new Date(createdAt.getTime() + 3 * 60 * 1000); // 3 minutes later
      const otpData = this.otpRepository.create({ email, otp_hash, expiresAt });
      await this.otpRepository.save(otpData);
      return true;
    } catch (error) {
      throw new Error('OTP recording error');
    }
  }
}
