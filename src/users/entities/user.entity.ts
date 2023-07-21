import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 25 })
  name: string;

  @IsEmail()
  @Column({ type: 'varchar', name: 'email', length: 100 })
  email: string;

  @Column({ type: 'text', name: 'password' })
  password: string;

  @Column({ type: 'varchar', name: 'mobile', length: 20 })
  mobile: string;

  // @ManyToOne(() => RoleEntity, (role) => role.user)
  // @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  // role: RoleEntity

  // @ManyToOne(() => CompanyEntity, (company) => company.user)
  // @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  // company: CompanyEntity

  @Column({ type: 'boolean', name: 'google_auth', default: false })
  googleAuth: boolean;

  @Column({ type: 'boolean', name: 'facebook_auth', default: false })
  facebookAuth: boolean;

  @Column({ type: 'boolean', name: 'password_flag', default: false })
  passwordFlag: boolean;

  @Column({ type: 'boolean', name: 'email_verify', default: false })
  emailVerify: boolean;

  @Column({ type: 'boolean', name: 'mobile_verify', default: false })
  mobileVerify: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  // 0 = INACTIVE , 1 = ACTIVE
  @Column({ type: 'integer', name: 'status', default: 1 })
  status: number;
}
