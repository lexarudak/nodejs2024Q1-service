import {
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ErrorCodes, Fields, Items } from './const';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { compare, hash } from 'bcrypt';
import { JwtPayload, sign } from 'jsonwebtoken';

type NewType = Fields;
export type TokenData = {
  JWT_SECRET_KEY: string;
  JWT_SECRET_REFRESH_KEY: string;
  TOKEN_EXPIRE_TIME: string;
  TOKEN_REFRESH_EXPIRE_TIME: string;
};

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

export const isExist = (item: any, Items: Items, forbidden?: boolean) => {
  if (!item && forbidden) throw new ForbiddenException(`${Items} not found`);
  if (!item) throw new NotFoundException(`${Items} not found`);
};

export const isPassCorrect = async (password: string, hashPas: string) => {
  const isCorrect = await compare(password, hashPas);
  if (!isCorrect) {
    throw new ForbiddenException(`Password is wrong`);
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

export const getTokens = (
  payload: string | JwtPayload,
  {
    JWT_SECRET_KEY,
    JWT_SECRET_REFRESH_KEY,
    TOKEN_EXPIRE_TIME,
    TOKEN_REFRESH_EXPIRE_TIME,
  }: TokenData,
) => {
  const accessToken = sign(payload, JWT_SECRET_KEY, {
    expiresIn: TOKEN_EXPIRE_TIME,
  });
  const refreshToken = sign(payload, JWT_SECRET_REFRESH_KEY, {
    expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
  });

  return { accessToken, refreshToken };
};
