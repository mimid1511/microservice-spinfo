import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from './prisma.service';
// import { ConfigModule } from '@nestjs/config';
// import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
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
})
export class UsersModule { }
