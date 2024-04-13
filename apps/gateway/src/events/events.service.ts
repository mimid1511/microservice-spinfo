import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EventsService {
  private eventsServiceUrl = 'http://localhost:3003/events';

  async createEvent(createEventDto: any): Promise<any> {
    try {
      const response = await axios.post(
        `${this.eventsServiceUrl}`,
        createEventDto,
      );
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw new InternalServerErrorException('Event service is unavailable.');
    }
  }

  async getAllEvents() {
    const response = await axios.get(`${this.eventsServiceUrl}`);
    return response.data;
  }

  async getEventById(id: string) {
    const response = await axios.get(`${this.eventsServiceUrl}/${id}`);
    return response.data;
  }

  async updateEvent(id: string, updateEventDto: any): Promise<any> {
    try {
      const response = await axios.put(
        `${this.eventsServiceUrl}/${id}`,
        updateEventDto,
      );
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw new InternalServerErrorException('Event service is unavailable.');
    }
  }

  async deleteEvent(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.eventsServiceUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw new InternalServerErrorException('Event service is unavailable.');
    }
  }
}
