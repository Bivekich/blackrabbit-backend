import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseYear: number;

  @Column()
  rating: number;

  @Column()
  popularity: number;

  @ManyToOne(() => Category, (category) => category.movies)
  category: Category;
}
