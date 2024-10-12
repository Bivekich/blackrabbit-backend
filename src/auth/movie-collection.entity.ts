import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Movie } from '../movies/movie.entity';

@Entity()
export class MovieCollection {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.movieCollection)
  user: User;

  @ManyToOne(() => Movie)
  movie: Movie;
}
