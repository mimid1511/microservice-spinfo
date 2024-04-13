import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Ticket, Prisma } from '@prisma/client';

@Injectable()
export class TicketsService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async createTicket(data: Prisma.TicketCreateInput): Promise<Ticket> {
    return this.prisma.ticket.create({ data });
  }
  async findAllTickets(): Promise<Ticket[]> {
    return this.prisma.ticket.findMany();
  }

  async findTicketsById(id: string): Promise<Ticket | null> {
    return this.prisma.ticket.findUnique({
      where: { ticketId: id },
    });
  }

  async updateTicket(
    id: string,
    data: Prisma.TicketUpdateInput,
  ): Promise<Ticket> {
    return this.prisma.ticket.update({
      where: { ticketId: id },
      data,
    });
  }

  async deleteTicket(id: string): Promise<Ticket> {
    return this.prisma.ticket.delete({
      where: { ticketId: id },
    });
  }
}
