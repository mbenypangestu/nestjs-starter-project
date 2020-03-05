import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'M Beny Pangestu' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'mbenypangestu@gmail.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'mygetzu28' })
  cashtag: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ minLength: 8, example: 'mygetzu123' })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: '3153142810980003' })
  nik: string;

  @IsNotEmpty()
  @ApiProperty({ example: '082334901664' })
  phone: string;

  @ApiProperty({ required: false, example: 'Probolinggo' })
  place_birth: string;

  @ApiProperty({ required: false, example: '1998-10-28' })
  date_birth: string;

  @ApiProperty({ required: false, example: 'L' })
  gender: string;

  @ApiProperty({
    required: false,
    type: 'string',
    format: 'binary',
    nullable: true,
  })
  photo?: any;

  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    example: 1,
    description: '1 : Parent, 2: Child, 3: Merchant',
  })
  role_id: number;
}
