import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
// import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { LocalStrategy } from './auth/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule, EventsModule, AuthModule, PassportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
