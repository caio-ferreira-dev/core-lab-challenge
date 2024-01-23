import {
  Controller,
  Query,
  Body,
  Get,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { RegisterDTO } from './DTO/register.dto';
import { UserService } from './user.service';
import { LoginDTO } from './DTO/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() reqData: RegisterDTO): Promise<any> {
    if (!reqData.login) {
      throw new BadRequestException('Login field not provided');
    }

    if (!reqData.password) {
      throw new BadRequestException('Password field not provided');
    }

    if (!reqData.username) {
      throw new BadRequestException('Username field not provided');
    }

    const username = await this.userService.saveUser(reqData);
    return {
      message: `User ${username} registered!`,
    };
  }

  @Get('login')
  async login(@Query() reqData: LoginDTO): Promise<any> {
    const dbReponse = await this.userService.logUser(reqData);
    return {
      message: 'Logged',
      token: dbReponse.token,
      username: dbReponse.username,
    };
  }
}
