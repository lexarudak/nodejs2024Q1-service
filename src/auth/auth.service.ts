import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Items, TOKEN_ENV } from 'src/utils/const';
import {
  TokenData,
  getTokens,
  isExist,
  isPassCorrect,
} from 'src/utils/helpers';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}
  getTokenData() {
    return Object.values(TOKEN_ENV).reduce((acc, value) => {
      return { ...acc, [value]: this.configService.get(value) };
    }, {} as TokenData);
  }

  async login({ login, password }: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        login,
      },
    });

    isExist(user, Items.user, true);
    await isPassCorrect(password, user.password);

    return getTokens({ login, userId: user.id }, this.getTokenData());
  }

  async refresh(refreshToken: string) {
    try {
      const { login, userId } = verify(
        refreshToken,
        this.configService.get(TOKEN_ENV.refreshKey),
      ) as { login: string; userId: string };
      return getTokens({ login, userId }, this.getTokenData());
    } catch {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
  }
}
