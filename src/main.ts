import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const yamlDocument = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('docs', app, yamlDocument);
  await app.listen(port);
}
bootstrap();
