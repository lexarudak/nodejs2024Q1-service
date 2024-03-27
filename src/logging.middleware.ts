import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logging/logging.service';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  async use(req: ExpressRequest, res: Response, next: () => void) {
    const { originalUrl, params, body, query } = req;
    await this.loggingService.logReq({
      url: originalUrl,
      params,
      query,
      body,
    });
    next();
  }
}
