// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { EventsModule } from './events.module';

async function bootstrap() {
  const app = await NestFactory.create(EventsModule);
  const config = new DocumentBuilder()
    .setTitle('Events API')
    .setDescription('The Events API description')
    .setVersion('1.0')
    .addTag('events')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3003);
  console.log(`Event management app is running on port 3003`);
}
bootstrap();
