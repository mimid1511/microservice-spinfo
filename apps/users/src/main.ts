// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // const app = await NestFactory.create(UsersModule);
  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     host: 'localhost',
  //     port: 3001,
  //   },
  // });
  // await app.startAllMicroservices();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  Logger.log('User service running on port 3000');
}
bootstrap();
