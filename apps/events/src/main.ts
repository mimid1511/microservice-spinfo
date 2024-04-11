// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { EventsModule } from './events.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(EventsModule);
  const config = new DocumentBuilder()
    .setTitle('Events API')
    .setDescription('The Events API description')
    .setVersion('1.0')
    .addTag('events')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3003);
}
bootstrap();
