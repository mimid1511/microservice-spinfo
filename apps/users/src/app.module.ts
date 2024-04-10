import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [UsersModule, AuthModule, PassportModule],
  controllers: [AppController],
  providers: [AppService, AuthService, LocalStrategy],
})
export class AppModule { }
