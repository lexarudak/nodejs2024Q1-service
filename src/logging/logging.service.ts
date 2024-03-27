import { Injectable } from '@nestjs/common';
import { appendFile } from 'fs/promises';

@Injectable()
export class LoggingService {
  requestLogsPath = './request-logs.txt';
  responseLogsPath = './response-logs.txt';
  errorsLogsPath = './errors-logs.txt';
  logErrorMessage = 'LOGS ERROR';
  logMessageEnd = '\n-----------------\n';

  private _makeLog(obj: object) {
    return `${[new Date(Date.now())]}: ${JSON.stringify(obj, null, 2)}${
      this.logMessageEnd
    }`;
  }

  private async _writeLog(obj: object, filePath: string) {
    const log = this._makeLog(obj);
    try {
      await appendFile(filePath, log);
    } catch (e) {
      console.log(this.logErrorMessage, e);
    }
  }

  async logRes(obj: object) {
    await this._writeLog(obj, this.responseLogsPath);
  }

  async logReq(obj: object) {
    await this._writeLog(obj, this.requestLogsPath);
  }

  async logErr(obj: object) {
    await this._writeLog(obj, this.errorsLogsPath);
  }
}
