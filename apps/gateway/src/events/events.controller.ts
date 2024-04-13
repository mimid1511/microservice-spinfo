import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post(':userId')
  async create(@Body() createEventDto: any) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get()
  getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Get(':id')
  getEventById(@Param('id') id: string) {
    return this.eventsService.getEventById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: any) {
    return this.eventsService.updateEvent(id, updateEventDto);
  }

  // @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }
}
