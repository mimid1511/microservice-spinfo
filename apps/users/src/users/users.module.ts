import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';
// import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UsersModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule { }
