import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import {
  changeDataFormat,
  errorHandler,
  exclude,
  hashPassword,
  isExist,
  isPassCorrect,
} from 'src/utils/helpers';
import { Items } from 'src/utils/const';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ login, password }: CreateUserDto) {
    const hashedPas = await hashPassword(password);
    const oldUser = await this.prisma.user.findUnique({
      where: {
        login,
      },
    });
    if (oldUser) {
      await this.prisma.user.delete({
        where: {
          login,
        },
      });
    }

    const user = await this.prisma.user.create({
      data: {
        login,
        password: hashedPas,
      },
    });

    return exclude(changeDataFormat(user));
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => exclude(changeDataFormat(user)));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    isExist(user, Items.user);

    return exclude(changeDataFormat(user));
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    isExist(user, Items.user);
    await isPassCorrect(oldPassword, user.password);

    const hashedNewPas = await hashPassword(newPassword);
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedNewPas,
        version: {
          increment: 1,
        },
      },
    });

    return exclude(changeDataFormat(updatedUser));
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
