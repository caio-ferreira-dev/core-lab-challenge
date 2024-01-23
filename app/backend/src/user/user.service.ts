import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegisterDTO } from './DTO/register.dto';
import { AuthService } from 'src/auth/auth.service';
import { tokenResponse } from './types/tokenResponse.type';
import { LoginDTO } from './DTO/login.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly authService: AuthService,
  ) {}

  async saveUser(reqData: RegisterDTO): Promise<string> {
    const dbData = await this.dbService.user.findFirst({
      where: {
        login: reqData.login,
      },
    });

    if (dbData) {
      throw new ConflictException('Login já cadastrado.');
    }

    const registeredUser = await this.dbService.user.create({
      data: {
        login: reqData.login,
        password: reqData.password,
        username: reqData.username,
      },
    });

    return registeredUser.username;
  }

  async logUser(reqData: LoginDTO): Promise<tokenResponse> {
    const dbData = await this.dbService.user.findFirst({
      where: {
        login: reqData.login,
        password: reqData.password,
      },
    });

    if (!dbData) {
      throw new UnauthorizedException('Login/Senha incorretos.');
    }

    const token = this.authService.createToken(dbData.id, dbData.username);

    return {
      token,
      username: dbData.username,
    };
  }
}
