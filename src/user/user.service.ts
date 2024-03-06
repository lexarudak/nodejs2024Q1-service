import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UUID } from 'src/utils/intefaces';

const testUser: User = new User({
  login: 'test',
  password: 'test',
});

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
    const user = new User(createUserDto);
    this.usersDB.set(user.id, user);
    return this.removePas(user);
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
