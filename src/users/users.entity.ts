import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  user_name: string;
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  user_email: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  user_type: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  user_password: string;
  @CreateDateColumn({ type: 'timestamp' })
  create_date: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  update_date: Date;
}
