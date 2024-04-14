import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) { }

  @Post(':userId')
  async create(@Body() createTicketDto: any) {
    return this.ticketsService.createTicket(createTicketDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tickets' })
  @ApiResponse({
    status: 200,
    description: 'List of all tickets',
    type: [Object],
  })
  getAllTickets() {
    return this.ticketsService.getAllTickets();
  }

  @ApiOperation({ summary: 'Get a ticket by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the ticket', type: String })
  @ApiResponse({
    status: 200,
    description: 'Details of the ticket',
    type: Object,
  })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  @Get(':id')
  getTicketById(@Param('id') id: string) {
    return this.ticketsService.getTicketById(id);
  }

  @ApiOperation({ summary: 'Delete a ticket' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the ticket to delete',
    type: String,
  })
  @ApiResponse({
    status: 204,
    description: 'The ticket has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.deleteTicket(id);
  }
}
