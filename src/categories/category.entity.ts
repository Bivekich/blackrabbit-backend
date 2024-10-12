import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Movie } from '../movies/movie.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Movie, (movie) => movie.category)
  movies: Movie[];
}
