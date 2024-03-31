import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, UserService, PrismaService, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}
