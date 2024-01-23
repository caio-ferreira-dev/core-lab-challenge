import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './types/payload.type';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(id: number, username: string): string {
    return this.jwtService.sign(
      {
        id,
        username,
      },
      {
        expiresIn: '1 day',
        subject: `${id}`,
        audience: 'user',
        issuer: 'login',
      },
    );
  }

  verifyToken(token: string): Payload {
    const data = this.jwtService.verify(token, {
      audience: 'user',
      issuer: 'login',
    });
    return data;
  }
}
