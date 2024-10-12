// src/movies/movies.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('by-category')
  @ApiOperation({ summary: 'Получение фильмов по категории' })
  @ApiResponse({ status: 200, description: 'Фильмы по категории получены' })
  getMoviesByCategory(@Query('categoryId') categoryId: number) {
    return this.moviesService.findByCategory(categoryId);
  }

  @Get('search')
  @ApiOperation({ summary: 'Поиск фильмов' })
  @ApiResponse({ status: 200, description: 'Результаты поиска фильмов' })
  searchMovies(
    @Query('keyword') keyword: string,
    @Query('genreId') genreId?: number,
    @Query('year') year?: number,
    @Query('sort') sort?: string,
  ) {
    return this.moviesService.searchByKeywordAndFilters(
      keyword,
      genreId,
      year,
      sort,
    );
  }
}
