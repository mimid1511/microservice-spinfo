// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { TicketsModule } from './tikcets.module';

async function bootstrap() {
  const app = await NestFactory.create(TicketsModule);
  const config = new DocumentBuilder()
    .setTitle('Tickets API')
    .setDescription('The Tickets API description')
    .setVersion('1.0')
    .addTag('Tickets')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3040);
  console.log(`Ticket management app is running on port 3040`);
}
bootstrap();
