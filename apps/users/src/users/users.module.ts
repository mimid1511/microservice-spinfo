import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthController } from 'src/auth/auth.controller';
import { JwtAuthMiddleware } from './../jwt-auth.middleware';
import { PrismaService } from './../prisma.service';
import { UsersService } from './users.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios'; // Import HttpModule for HTTP requests

@Module({
  imports: [HttpModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes(UsersController);
  }
}
