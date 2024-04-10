// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Transport } from '@nestjs/microservices';

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
  const app = await NestFactory.create(UsersModule);
  await app.listen(3000);
  console.log(`User management app is running on port 3000`);
}
bootstrap();
