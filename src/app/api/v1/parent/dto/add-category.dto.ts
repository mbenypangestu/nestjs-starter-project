import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCategoryProductDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  category_id: number;
}
