import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ example: 'Титаник', description: 'Название фильма' })
  title: string;

  @ApiProperty({ example: 1997, description: 'Год выпуска фильма' })
  releaseYear: number;

  @ApiProperty({ example: 7.8, description: 'Рейтинг фильма' })
  rating: number;

  @ApiProperty({ example: 100, description: 'Популярность фильма' })
  popularity: number;

  @ApiProperty({ example: 1, description: 'ID категории фильма' })
  categoryId: number;
}
