import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto, UpdateTicketDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) { }

  @Post()
  @ApiOperation({ summary: 'Create event' })
  @ApiResponse({ status: 201, description: 'The event has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createEventDto: CreateTicketDto) {
    return this.ticketsService.createTicket(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tickets' })
  findAll() {
    return this.ticketsService.findAllTickets();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by ID' })
  findOne(@Param('id') id: string) {
    return this.ticketsService.findTicketsById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an event' })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateTicketDto) {
    return this.ticketsService.updateTicket(id, updateEventDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an event' })
  remove(@Param('id') id: string) {
    return this.ticketsService.deleteTicket(id);
  }
}
