import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { Category } from '../categories/category.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.movieRepository.find({ relations: ['category'] });
  }

  async create(createMovieDto: CreateMovieDto) {
    const { categoryId, ...movieData } = createMovieDto;
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error('Категория не найдена');
    }

    const movie = this.movieRepository.create({
      ...movieData,
      category,
    });

    return await this.movieRepository.save(movie);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!movie) {
      throw new NotFoundException('Фильм не найден');
    }

    if (updateMovieDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateMovieDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException('Категория не найдена');
      }
      movie.category = category;
    }

    Object.assign(movie, updateMovieDto);
    return await this.movieRepository.save(movie);
  }

  async remove(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException('Фильм не найден');
    }

    return await this.movieRepository.remove(movie);
  }
}
