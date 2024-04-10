import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';
// import { ConfigModule } from '@nestjs/config';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UsersModule, forwardRef(() => AuthModule)],
  // ClientsModule.register([
  //   {
  //     name: 'AUTH_CLIENT',
  //     transport: Transport.TCP,
  //     options: {
  //       host: 'localhost',
  //       port: 3001,
  //     },
  //   },
  // ]),],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule { }
