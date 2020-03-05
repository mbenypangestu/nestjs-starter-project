import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'mygetzu28' })
  cashtag: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'mygetzu123' })
  password: string;
}
