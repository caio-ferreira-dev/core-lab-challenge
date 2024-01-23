import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = this.authService.verifyToken(
        (authorization ?? '').split(' ')[1],
      );
      request.tokenPayload = data;
      return true;
    } catch (e) {
      return false;
    }
  }
}
