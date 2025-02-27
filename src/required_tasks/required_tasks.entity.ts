import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'required_tasks' })
export class RequiredTasks {
  @PrimaryGeneratedColumn('uuid')
  req_task_id: number;
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
