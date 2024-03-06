import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UUID } from 'src/utils/intefaces';
import { v4 as uuid } from 'uuid';

const testUser: User = {
  id: uuid(),
  login: 'test',
  password: 'test',
  version: 1,
  createdAt: 11.2,
  updatedAt: 22.22,
};

@Injectable()
export class UserService {
  usersDB: Map<UUID, User>;
  constructor() {
    this.usersDB = new Map<UUID, User>();
    this.usersDB.set(testUser.id, testUser);
  }

  removePas(user: User) {
    return { ...user, password: undefined };
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    const users = Array.from(this.usersDB.values()).map(this.removePas);
    return users;
  }

  findOne(id: string) {
    const user = this.removePas(this.usersDB.get(id));

    if (!user.id) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
