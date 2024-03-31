export const FAVS_ID = 'fav';

export const enum Fields {
  pass = 'password',
  favs = 'favs',
}

export const enum Items {
  user = 'User',
  track = 'Track',
  artist = 'Artist',
  album = 'Album',
}

export const enum ErrorCodes {
  notFound = 'P2025',
  unprocessable = '422',
}

export enum TITLES {
  response = 'RESPONSE',
  request = 'REQUEST',
  error = 'ERROR',
  uncaught = 'UNCAUGHT EXCEPTION',
  unhandled = 'UNHANDLED REJECTION',
}

export enum ENV {
  log = 'LOG_SIZE',
  err = 'LOG_ERRORS_SIZE',
}

export enum TOKEN_ENV {
  tokenKey = 'JWT_SECRET_KEY',
  refreshKey = 'JWT_SECRET_REFRESH_KEY',
  tokenTime = 'TOKEN_EXPIRE_TIME',
  refreshTime = 'TOKEN_REFRESH_EXPIRE_TIME',
}
