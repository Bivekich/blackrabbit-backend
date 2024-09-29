import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: UserRole.USER })
  role: UserRole;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ default: new Date() })
  subscriptionExpiry: Date;

  @Column({ nullable: true })
  confirmationCode: string;

  @Column({ nullable: true })
  resetPasswordCode: string;
}
