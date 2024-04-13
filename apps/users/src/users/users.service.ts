import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import axios from 'axios';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
  ) { }


  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = { ...data, password: hashedPassword };
    return this.prisma.user.create({ data: userData });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  async getUserEvents(userId: string): Promise<string[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { eventsAdmin: true }
    });
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }
    return user.eventsAdmin;
  }

  async addEventToUser(userId: string, eventId: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        eventsAdmin: {
          push: eventId
        }
      }
    });
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findUserById(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async updateUser(
    userId: string,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async deleteUser(userId: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      return null;
    }
  }


  // async getAllEventsFromEventService(): Promise<any> {
  //   try {
  //     const response = await axios.get(`${process.env.EVENT_SERVICE_URL}/events`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching events:', error);
  //     throw new InternalServerErrorException('Event service is offline.');
  //   }
  // }

  // async createAdminEvent(userId: string, eventDto: any, token: string): Promise<any> {
  //   const user = await this.findUserById(userId);
  //   if (user && user.role === 'ADMIN') {
  //     return axios.post(`${process.env.EVENT_SERVICE_URL}/events`, eventDto, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //   } else {
  //     throw new ForbiddenException('Only admins can create events.');
  //   }
  // }

  // async validateToken(token: string): Promise<boolean> {
  //   try {
  //     const response = await axios.get('http://localhost:3001/auth/validate', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return response.data.isValid;
  //   } catch (error) {
  //     console.error('Token validation error:', error);
  //     return false;
  //   }
  // }
}
