import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'Получение всех фильмов' })
  @ApiResponse({ status: 200, description: 'Успешное получение фильмов' })
  findAll() {
    return this.moviesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создание нового фильма' })
  @ApiResponse({ status: 201, description: 'Фильм успешно создан' })
  @ApiResponse({ status: 400, description: 'Ошибка создания фильма' })
  @ApiBody({ type: CreateMovieDto })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Редактирование фильма' })
  @ApiResponse({ status: 200, description: 'Фильм успешно обновлен' })
  @ApiResponse({ status: 404, description: 'Фильм не найден' })
  @ApiBody({ type: UpdateMovieDto })
  update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление фильма' })
  @ApiResponse({ status: 200, description: 'Фильм успешно удален' })
  @ApiResponse({ status: 404, description: 'Фильм не найден' })
  remove(@Param('id') id: number) {
    return this.moviesService.remove(id);
  }
}
