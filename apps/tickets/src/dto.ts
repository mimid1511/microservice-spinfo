import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({ example: 'Ticket Name', description: 'Name of the Ticket' })
  readonly ticketId: string;
  readonly eventId: string;
  readonly userId: string;
  readonly number: number;
}

export class UpdateTicketDto {
  ticketId?: string;
  eventId?: string;
  userId?: string;
  number?: number;
}
