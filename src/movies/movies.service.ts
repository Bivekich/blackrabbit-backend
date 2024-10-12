// src/movies/movies.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  findByCategory(categoryId: number) {
    return this.movieRepository.find({
      where: { category: { id: categoryId } },
    });
  }

  searchByKeywordAndFilters(
    keyword: string,
    genreId?: number,
    year?: number,
    sort?: string,
  ) {
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');
    queryBuilder.where('movie.title LIKE :keyword', {
      keyword: `%${keyword}%`,
    });

    if (genreId) {
      queryBuilder.andWhere('movie.categoryId = :genreId', { genreId });
    }

    if (year) {
      queryBuilder.andWhere('movie.releaseYear = :year', { year });
    }

    if (sort) {
      switch (sort) {
        case 'rating':
          queryBuilder.orderBy('movie.rating', 'DESC');
          break;
        case 'popularity':
          queryBuilder.orderBy('movie.popularity', 'DESC');
          break;
        case 'new':
          queryBuilder.orderBy('movie.releaseYear', 'DESC');
          break;
      }
    }

    return queryBuilder.getMany();
  }
}
