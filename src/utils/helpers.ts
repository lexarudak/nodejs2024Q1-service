import {
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ErrorCodes, Fields, Items } from './const';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { compare, hash } from 'bcrypt';

type NewType = Fields;

interface UserStringDate {
  createdAt: Date;
  updatedAt: Date;
}

export function exclude<User, Key extends keyof User>(
  user: User,
): Omit<User, Key> {
  const keys: NewType[] = [Fields.favs, Fields.pass];
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key as Fields)),
  ) as Omit<User, Key>;
}

export const isExist = (item: any, Items: Items) => {
  if (!item) throw new NotFoundException(`${Items} not found`);
};

export const isOldPasCorrect = async (password: string, hashPas: string) => {
  const isCorrect = await compare(password, hashPas);
  if (!isCorrect) {
    throw new ForbiddenException(`Old password is wrong`);
  }
};

export const errorHandler = (
  { code, meta: { modelName, cause } }: PrismaClientKnownRequestError,
  manualCode?: ErrorCodes,
) => {
  switch (manualCode || code) {
    case ErrorCodes.unprocessable:
      throw new UnprocessableEntityException('Entity not found');

    case ErrorCodes.notFound:
      throw new NotFoundException(`${modelName}: ${cause}`);

    default:
      break;
  }
};

export const changeDataFormat = (user: UserStringDate) => {
  return {
    ...user,
    createdAt: new Date(user.createdAt).getTime(),
    updatedAt: new Date(user.updatedAt).getTime(),
  };
};

export const hashPassword = async (password: string, saltRounds = 10) => {
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
};
