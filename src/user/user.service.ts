import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import {
  errorHandler,
  exclude,
  isExist,
  isOldPasCorrect,
} from 'src/utils/helpers';
import { Items } from 'src/utils/const';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ login, password }: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        login,
        password,
      },
    });
    return exclude(user);
  }

  findAll() {
    const users = this.prisma.user.findMany();
    return exclude(users);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    isExist(user, Items.user);

    return exclude(user);
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    isExist(user, Items.user);
    isOldPasCorrect(user, oldPassword);

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
        version: {
          increment: 1,
        },
      },
    });

    return exclude(updatedUser);
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      errorHandler(e);
    }
  }
}
