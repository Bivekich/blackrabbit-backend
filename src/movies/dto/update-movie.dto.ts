import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieDto {
  @ApiProperty({
    example: 'Титаник',
    description: 'Название фильма',
    required: false,
  })
  title?: string;

  @ApiProperty({
    example: 1997,
    description: 'Год выпуска фильма',
    required: false,
  })
  releaseYear?: number;

  @ApiProperty({ example: 7.8, description: 'Рейтинг фильма', required: false })
  rating?: number;

  @ApiProperty({
    example: 100,
    description: 'Популярность фильма',
    required: false,
  })
  popularity?: number;

  @ApiProperty({
    example: 1,
    description: 'ID категории фильма',
    required: false,
  })
  categoryId?: number;
}
