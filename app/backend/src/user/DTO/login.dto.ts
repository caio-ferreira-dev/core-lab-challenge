import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDTO {
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
}
