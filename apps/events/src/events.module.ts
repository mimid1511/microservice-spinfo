import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'AUTH_CLIENT',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  ]),],
  controllers: [EventsController],
  providers: [EventsService, PrismaService],
})
export class EventsModule { }
