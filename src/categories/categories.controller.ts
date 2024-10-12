import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

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

  @Post()
  @ApiOperation({ summary: 'Создание новой категории' })
  @ApiResponse({ status: 201, description: 'Категория успешно создана' })
  @ApiResponse({ status: 400, description: 'Ошибка создания категории' })
  @ApiBody({ type: CreateCategoryDto })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Редактирование категории' })
  @ApiResponse({ status: 200, description: 'Категория успешно обновлена' })
  @ApiResponse({ status: 404, description: 'Категория не найдена' })
  @ApiBody({ type: UpdateCategoryDto })
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление категории' })
  @ApiResponse({ status: 200, description: 'Категория успешно удалена' })
  @ApiResponse({ status: 404, description: 'Категория не найдена' })
  remove(@Param('id') id: number) {
    return this.categoriesService.remove(id);
  }
}
