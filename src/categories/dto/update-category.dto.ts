import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'Комедия',
    description: 'Название категории',
    required: false,
  })
  name?: string;
}
