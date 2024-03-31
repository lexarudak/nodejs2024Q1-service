import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request as ExpressRequest } from 'express';
import { verify } from 'jsonwebtoken';
import { TOKEN_ENV } from './utils/const';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  async use(req: ExpressRequest, res: Response, next: () => void) {
    if (Object.values(req.params).includes('auth/refresh')) {
      if (!req.body.refreshToken)
        throw new UnauthorizedException('No Refresh token');
      try {
        verify(
          req.body.refreshToken,
          this.configService.get(TOKEN_ENV.refreshKey),
        );
        return next();
      } catch {
        throw new ForbiddenException('Refresh token is invalid or expired');
      }
    }
    try {
      const header = req.headers['authorization'];
      const [bearer, token] = header.split(' ');
      verify(token, this.configService.get(TOKEN_ENV.tokenKey));
      if (bearer !== 'Bearer') throw new Error();
      return next();
    } catch {
      throw new UnauthorizedException('Invalid authorization token');
    }
  }
}
