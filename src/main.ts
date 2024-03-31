import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import { ExceptionsFilter } from './exceptions.filter';
import { LoggingService } from './logging/logging.service';
import { ConfigService } from '@nestjs/config';

const port = process.env.PORT || 4000;
const logger = new LoggingService(new ConfigService());

async function bootstrap() {
  process.on('uncaughtException', async (err) => {
    await logger.logUncaughtException(err);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.logUnhandledRejection(reason, promise);
    process.exit(1);
  });

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionsFilter(logger));
  app.useGlobalPipes(new ValidationPipe());

  const yamlDocument = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('docs', app, yamlDocument);
  await app.listen(port);
}
bootstrap();
