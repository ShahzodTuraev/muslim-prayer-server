import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'otp' })
export class Otp {
  @PrimaryGeneratedColumn()
  otp_id: number;
  @Column({ nullable: false })
  otp_hash: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
