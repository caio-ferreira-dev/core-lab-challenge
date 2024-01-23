import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SessionDTO {
  @ApiProperty({
    description: 'Session theme',
    example: 'Learning JavaScript',
  })
  @IsString()
  activityName: string;

  @ApiProperty({
    description: 'Time elapsed',
    example: 'HH:MM:SS',
  })
  @IsString()
  time: string;
}
