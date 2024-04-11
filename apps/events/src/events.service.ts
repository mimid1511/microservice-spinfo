import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Event, Prisma } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async getUserFromUserService(userId: string, token: string): Promise<any> {
    try {
      const response = await axios.get(`${process.env.USER_SERVICE_URL}/users/${userId}`);
      {
        `Bearer ${token}`
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new InternalServerErrorException('User service is offline.');
    }
  }

  async createEvent(data: Prisma.EventCreateInput): Promise<Event> {
    return this.prisma.event.create({ data });
  }
  async findAllEvents(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  async findEventsById(id: string): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: { eventId: id },
    });
  }

  async updateEvent(
    id: string,
    data: Prisma.EventUpdateInput,
  ): Promise<Event> {
    return this.prisma.event.update({
      where: { eventId: id },
      data,
    });
  }

  async deleteEvent(id: string): Promise<Event> {
    return this.prisma.event.delete({
      where: { eventId: id },
    });
  }
}
