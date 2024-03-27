import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from './logging/logging.service';

@Catch()
export class ExceptionsFilter<T> implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}

  DEFAULT_STATUS: 500;
  DEFAULT_MESSAGE: 'Internal server error';

  getExceptionMessage(exception: HttpException) {
    const res = exception.getResponse();
    return typeof res === 'object' && 'message' in res ? res.message : res;
  }

  async catch(exception: T, host: ArgumentsHost) {
    const { getRequest, getResponse } = host.switchToHttp();
    const res = getResponse<Response>();
    const req = getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : this.DEFAULT_STATUS;
    const message =
      exception instanceof HttpException
        ? this.getExceptionMessage(exception)
        : this.DEFAULT_MESSAGE;

    const body = {
      status,
      message,
      time: new Date(Date.now()),
      url: req.originalUrl,
    };

    await this.loggingService.logErr(body);
    res.status(status).json(body);
  }
}
