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
  req_task_id: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  req_task_code: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  req_task_name: string;
  @Column({ nullable: false })
  createId: string;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
