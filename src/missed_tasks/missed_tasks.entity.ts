import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'missed_tasks' })
export class MissedTasks {
  @PrimaryGeneratedColumn('uuid')
  task_id: string;
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
  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
