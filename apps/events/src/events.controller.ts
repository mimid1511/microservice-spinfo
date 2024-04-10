import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAllEvents();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findEventsById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.updateEvent(id, updateEventDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }
}
