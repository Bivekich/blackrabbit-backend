import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user.entity';
import { Movie } from '../movies/movie.entity';

@Entity()
export class ViewingHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.viewingHistory)
  user: User;

  @ManyToOne(() => Movie)
  movie: Movie;

  @Column('int')
  lastWatchedTime: number; // в секундах, чтобы запомнить место остановки
}
