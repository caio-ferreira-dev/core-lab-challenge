import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterDTO {
  @ApiProperty({
    description: 'User login',
    example: 'caio_0711',
  })
  @IsString()
  login: string;

  @ApiProperty({
    description: 'User password',
    example: 'secret_password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The username that will be displayed in the dashboard',
    example: 'Caio Ferreira',
  })
  @IsString()
  username: string;
}
