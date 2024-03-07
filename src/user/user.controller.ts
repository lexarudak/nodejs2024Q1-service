import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidIdDto } from '../common-dto/valid-id.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: ValidIdDto) {
    return this.userService.findOne(id);
  }

  @Put()
  emptyUpdate() {
    throw new BadRequestException('User id must be provided');
  }

  @Put(':id')
  update(@Param() { id }: ValidIdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete()
  emptyDelete() {
    throw new BadRequestException('User id must be provided');
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: ValidIdDto) {
    return this.userService.remove(id);
  }
}
