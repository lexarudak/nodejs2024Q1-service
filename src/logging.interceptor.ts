import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { LoggingService } from './logging/logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (responseBody) => {
        const { getResponse, getRequest } = context.switchToHttp();
        const { statusCode } = getResponse();
        const { originalUrl, params, body: requestBody } = getRequest();

        await this.loggingService.logRes({
          originalUrl,
          params,
          requestBody,
          responseBody,
          statusCode,
        });
        return responseBody;
      }),
    );
  }
}
