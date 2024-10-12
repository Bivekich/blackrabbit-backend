import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Получение всех категорий фильмов' })
  @ApiResponse({ status: 200, description: 'Успешное получение категорий' })
  findAll() {
    return this.categoriesService.findAll();
  }
}
