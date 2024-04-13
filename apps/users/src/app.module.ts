import { Module } from '@nestjs/common';
// import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './auth/local.strategy';
// import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
