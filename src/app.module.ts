import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { OtpModule } from './otp/otp.module';
import { Otp } from './otp/otp.entity';
import { MissedTasksModule } from './missed_tasks/missed_tasks.module';
import { MissedTasks } from './missed_tasks/missed_tasks.entity';
import { RequiredTasksModule } from './required_tasks/required_tasks.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Otp, MissedTasks],
        synchronize: true,
        timezone: 'Z',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    OtpModule,
    MissedTasksModule,
    RequiredTasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
