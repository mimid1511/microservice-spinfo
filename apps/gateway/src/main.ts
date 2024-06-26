import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Booking API')
    .setDescription(
      'This a documentation from the API gateway manager of Events, Users and tickets endpoints',
    )
    .setVersion('1.0')
    .addTag('Users', 'Operations related to user management')
    .addTag('Events', 'Operations related to event management')
    .addTag('Tickets', 'Operations related to ticket management')
    .addTag('Auth', 'Operations related to login')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3030);
}
bootstrap();
