import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TicketsService {
  private ticketsServiceUrl = 'http://localhost:3040/tickets';

  async createTicket(createTicketDto: any): Promise<any> {
    // const paymentResult = await this.paymentsService.processPayment(ticketData.creditCardNumber, ticketData.amount);

    const paymentResult = true;
    if (!paymentResult) {
      throw new Error('Payment failed');
    }
    try {
      const response = await axios.post(
        `${this.ticketsServiceUrl}`,
        createTicketDto,
      );
      return response.data;
    } catch (error) {
      console.error('Error creating Ticket:', error);
      throw new InternalServerErrorException('Ticket service is unavailable.');
    }
  }

  async getAllTickets() {
    const response = await axios.get(`${this.ticketsServiceUrl}`);
    return response.data;
  }

  async getTicketById(id: string) {
    const response = await axios.get(`${this.ticketsServiceUrl}/${id}`);
    return response.data;
  }

  async deleteTicket(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.ticketsServiceUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting ticket:', error);
      throw new InternalServerErrorException('Ticket service is unavailable.');
    }
  }
}
