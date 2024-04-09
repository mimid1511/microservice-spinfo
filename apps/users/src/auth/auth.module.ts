import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import constants from './constants';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: constants.jwtSecret,
    signOptions: { expiresIn: '60s' },
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService],
})
export class AuthModule { }
