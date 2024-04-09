import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs'; @Injectable()

export class UsersService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) { }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }
  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
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
      const response = await firstValueFrom(
        this.httpService.get<boolean>(`http://api-gateway-url/validate-token?token=${token}`)
      );
      return response.data;
    } catch (error) {
      return false;
    }
  }
}
