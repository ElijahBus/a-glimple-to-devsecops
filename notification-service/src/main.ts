import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const port = 8001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap().then(() => {
  Logger.log(`--- Notification Service Running On Port: ${port}`);
});
