import { Module } from '@nestjs/common';
import { RequiredTasksModule } from 'src/required_tasks/required_tasks.module';
import { UsersModule } from 'src/users/users.module';

@Module({ imports: [UsersModule, RequiredTasksModule] })
export class PrayerTimeModule {}
