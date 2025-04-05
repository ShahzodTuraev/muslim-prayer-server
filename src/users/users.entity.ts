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
  @Column({ type: 'varchar', default: 'USER', length: 255, nullable: false })
  user_type: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  user_password: string;
  @Column({ type: 'varchar', length: 255 })
  country: string;
  @Column({ type: 'varchar', length: 255 })
  city: string;
  @Column('decimal', { precision: 9, scale: 6 })
  latitude: number;
  @Column('decimal', { precision: 9, scale: 6 })
  longitude: number;
  @Column({ default: 1 })
  prayer_method: number;
  @Column({ default: 1 })
  prayer_school: number;
  @CreateDateColumn({ type: 'timestamp' })
  create_date: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  update_date: Date;
}
