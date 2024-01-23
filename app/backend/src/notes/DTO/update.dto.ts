import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateDTO {
  @ApiProperty({
    description: 'Note id',
    example: 1,
  })
  @IsString()
  id: number;

  @ApiProperty({
    description: 'User id',
    example: 1,
  })
  @IsString()
  user_id: number;

  @ApiProperty({
    description: 'Note name',
    example: 'Code a cool app',
  })
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Note content',
    example: 'Create the app using modern JavaScript',
  })
  @IsString()
  content?: string;

  @ApiProperty({
    description: 'Favorite Note',
    example: true,
  })
  @IsString()
  favorite?: boolean;

  @ApiProperty({
    description: 'Note color',
    example: 'blue',
  })
  @IsString()
  color?: string;
}
