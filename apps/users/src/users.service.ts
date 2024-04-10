import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';
// import { ClientProxy } from '@nestjs/microservices';
import axios from 'axios';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    // @Inject('AUTH_CLIENT') private readonly authClient: ClientProxy,
  ) { }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
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

  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await axios.get('http://localhost:3001/auth/validate', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.isValid;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
    // const isValid = await this.authClient.send<boolean>({ role: 'auth', cmd: 'validate' }, token).toPromise();
    // return isValid;
  }
}
