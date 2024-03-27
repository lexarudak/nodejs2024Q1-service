import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream, createWriteStream } from 'fs';
import { appendFile, mkdir, stat, unlink } from 'fs/promises';
import { join } from 'path';
import { pipeline } from 'stream/promises';

enum TITLES {
  response = 'RESPONSE',
  request = 'REQUEST',
  error = 'ERROR',
  uncaught = 'UNCAUGHT EXCEPTION',
  unhandled = 'UNHANDLED REJECTION',
}

enum ENV {
  log = 'LOG_SIZE',
  err = 'LOG_ERRORS_SIZE',
}

@Injectable()
export class LoggingService {
  constructor(private configService: ConfigService) {}

  logFileName = 'log.txt';
  logErrorsFileName = 'log-errors.txt';
  logDirPath = 'logs';
  historyLogDirPath = 'log-history';
  historyErrorsDirPath = 'log-errors-history';

  logErrorMessage = 'LOGS ERROR';
  logMessageEnd = '\n-----------------\n';

  private _makeLog(title: TITLES, obj: object) {
    return `${title} --- ${[new Date(Date.now())]}: ${JSON.stringify(
      obj,
      null,
      2,
    )}${this.logMessageEnd}`;
  }

  private _getPath(isLog: boolean) {
    const path = join(
      this.logDirPath,
      isLog ? this.logFileName : this.logErrorsFileName,
    );
    return path;
  }

  private async _moveToHistory(path: string, isLog: boolean) {
    const maxSize = Number(this.configService.get(isLog ? ENV.log : ENV.err));
    try {
      const { size } = await stat(path);

      if (maxSize < size / 1024 - 0.5) {
        const historyPath = join(
          this.logDirPath,
          isLog ? this.historyLogDirPath : this.historyErrorsDirPath,
        );

        await mkdir(historyPath, { recursive: true });
        const readStream = createReadStream(path);
        const writeStream = createWriteStream(
          join(historyPath, `${Date.now()}.txt`),
        );

        await pipeline(readStream, writeStream);
        await unlink(path);
      }
    } catch {}
  }

  private async _writeLog(obj: object, title: TITLES, isLog = false) {
    const path = this._getPath(isLog);
    const log = this._makeLog(title, obj);
    try {
      await mkdir(this.logDirPath, { recursive: true });
      await this._moveToHistory(path, isLog);
      await appendFile(path, log);
    } catch (e) {
      console.log(this.logErrorMessage, e);
    }
  }

  async logRes(obj: object) {
    await this._writeLog(obj, TITLES.response, true);
  }

  async logReq(obj: object) {
    await this._writeLog(obj, TITLES.request, true);
  }

  async logErr(obj: object) {
    await this._writeLog(obj, TITLES.error);
  }

  async logUncaughtException(error: object) {
    await this._writeLog(
      {
        type: 'Uncaught Exception',
        error,
      },
      TITLES.uncaught,
    );
  }

  async logUnhandledRejection(reason: unknown, promise: Promise<unknown>) {
    await this._writeLog(
      {
        type: 'Unhandled Rejection',
        reason,
        promise,
      },
      TITLES.unhandled,
    );
  }
}
