import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'missed_tasks' })
export class MissedTasks {
  @PrimaryGeneratedColumn()
  task_id: number;
  @Column({ default: 0 })
  fajr: number;
  @Column({ default: 0 })
  dhuhr: number;
  @Column({ default: 0 })
  asr: number;
  @Column({ default: 0 })
  maghrib: number;
  @Column({ default: 0 })
  ishaa: number;
  @Column({ default: 0 })
  vitr: number;
  @Column({ default: 0 })
  fasting: number;
  @Column({ nullable: false })
  createId: string;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
