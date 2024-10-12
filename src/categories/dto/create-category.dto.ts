import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Комедия', description: 'Название категории' })
  name: string;
}
