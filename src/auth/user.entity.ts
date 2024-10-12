import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Watchlist } from './watchlist.entity';
import { MovieCollection } from './movie-collection.entity';
import { ViewingHistory } from './viewing-history.entity';

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

  @OneToMany(() => Watchlist, (watchlist) => watchlist.user)
  watchlist: Watchlist[];

  @OneToMany(() => MovieCollection, (collection) => collection.user)
  movieCollection: MovieCollection[];

  @OneToMany(() => ViewingHistory, (history) => history.user)
  viewingHistory: ViewingHistory[];
}
