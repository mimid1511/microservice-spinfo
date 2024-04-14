import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UsersService {
  private userServiceUrl = 'http://localhost:3020/users';

  async getAllUsers() {
    try {
      const response = await axios.get(`${this.userServiceUrl}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new InternalServerErrorException('User service is offline.');
    }
  }

  async getUserById(id: string) {
    const response = await axios.get(`${this.userServiceUrl}/${id}`);
    return response.data;
  }

  async createUser(createUserDto: any): Promise<any> {
    try {
      const response = await axios.post(
        `${this.userServiceUrl}`,
        createUserDto,
      );
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('User service is unavailable.');
    }
  }

  async findByEmail(email: string): Promise<any> {
    try {
      const response = await axios.get(`${this.userServiceUrl}/email/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new InternalServerErrorException('User service is unavailable.');
    }
  }

  async updateUser(id: string, updateUserDto: any): Promise<any> {
    try {
      const response = await axios.put(
        `${this.userServiceUrl}/${id}`,
        updateUserDto,
      );
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('User service is unavailable.');
    }
  }

  async deleteUser(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.userServiceUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new InternalServerErrorException('User service is unavailable.');
    }
  }
}
