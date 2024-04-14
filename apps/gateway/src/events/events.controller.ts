import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
  ApiSecurity,
} from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @ApiOperation({ summary: 'Create event' })
  @ApiBody({ description: 'Event creation data', type: Object })
  @ApiResponse({
    status: 201,
    description: 'The event has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Body() createEventDto: any) {
    return this.eventsService.createEvent(createEventDto);
  }

  @ApiOperation({ summary: 'Retrieve all events' })
  @ApiResponse({
    status: 200,
    description: 'List of all events',
    type: [Object],
  })
  @Get()
  getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @ApiOperation({ summary: 'Get an event by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the event', type: String })
  @ApiResponse({ status: 200, description: 'Event details', type: Object })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  @Get(':id')
  getEventById(@Param('id') id: string) {
    return this.eventsService.getEventById(id);
  }

  @ApiOperation({ summary: 'Update an event' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the event to be updated',
    type: String,
  })
  @ApiBody({ description: 'Event update data', type: Object }) // Specify the DTO class for better documentation
  @ApiResponse({ status: 200, description: 'Event updated successfully.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: any) {
    return this.eventsService.updateEvent(id, updateEventDto);
  }

  // @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an event' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the event to be deleted',
    type: String,
  })
  @ApiResponse({ status: 204, description: 'Event deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  @ApiBearerAuth()
  @ApiSecurity('roles', ['ADMIN', 'MANAGER'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }
}
