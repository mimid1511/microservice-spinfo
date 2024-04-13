import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { PrismaService } from './prisma.service';
@Module({
  imports: [TicketsModule],
  controllers: [TicketsController],
  providers: [TicketsService, PrismaService],
})
export class TicketsModule { }
