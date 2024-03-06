import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { usersDB } from 'src/db/db';

@Injectable()
export class UserService {
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
    usersDB.set(user.id, user);
    return this.removePas(user);
  }

  findAll() {
    const users = Array.from(usersDB.values()).map(this.removePas);
    return users;
  }

  findOne(id: string) {
    const user = usersDB.get(id);

    this.checkIsUserExist(user);

    return this.removePas(user);
  }

  update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const user = usersDB.get(id);

    this.checkIsUserExist(user);
    this.checkIsOldPasCorrect(user, oldPassword);

    user.setPas(newPassword);

    return this.removePas(user);
  }

  remove(id: string) {
    const user = usersDB.get(id);

    this.checkIsUserExist(user);
    usersDB.delete(user.id);
  }
}
