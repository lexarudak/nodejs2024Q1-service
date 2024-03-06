import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const testUser: User = new User({
  login: 'test',
  password: 'test',
});

@Injectable()
export class UserService {
  usersDB: Map<string, User>;
  constructor() {
    this.usersDB = new Map<string, User>();
    this.usersDB.set(testUser.id, testUser);
  }

  removePas(user: User) {
    return { ...user, password: undefined };
  }

  checkIsUserExist(user: User) {
    if (!user?.id) {
      throw new NotFoundException(`User with this id not found`);
    }
  }

  checkIsOldPasCorrect(user: User, oldPas: string) {
    if (user?.password !== oldPas) {
      throw new ForbiddenException(`Old password is wrong`);
    }
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
    const user = this.usersDB.get(id);

    this.checkIsUserExist(user);

    return this.removePas(user);
  }

  update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const user = this.usersDB.get(id);

    this.checkIsUserExist(user);
    this.checkIsOldPasCorrect(user, oldPassword);

    user.setPas(newPassword);

    return this.removePas(user);
  }

  remove(id: string) {
    const user = this.usersDB.get(id);

    this.checkIsUserExist(user);
    this.usersDB.delete(user.id);
  }
}
