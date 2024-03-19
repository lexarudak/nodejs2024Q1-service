import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ErrorCodes, Fields, Items } from './const';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

type NewType = Fields;

export function exclude<User, Key extends keyof User>(
  user: User,
  keys: NewType[] = [Fields.pass],
): Omit<User, Key> {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key as Fields)),
  ) as Omit<User, Key>;
}

export const isExist = (item: any, Items: Items) => {
  if (!item) throw new NotFoundException(`${Items} not found`);
};

export const isOldPasCorrect = (user: User, oldPas: string) => {
  if (user.password !== oldPas) {
    throw new ForbiddenException(`Old password is wrong`);
  }
};

export const errorHandler = ({
  code,
  meta: { modelName, cause },
}: PrismaClientKnownRequestError) => {
  switch (code) {
    case ErrorCodes.notFound:
      throw new NotFoundException(`${modelName}: ${cause}`);

    default:
      break;
  }
};
