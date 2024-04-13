import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus, UseGuards, Request, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '../dto';
// import { RolesGuard } from 'src/auth/roles.guard';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { Roles } from 'src/common/decorators/roles.decorator';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get('me')
  findMe(@Request() req: any) {
    return this.usersService.findUserById(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Get('/email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
  // @UseGuards(JwtAuthGuard)
  @Get(':id/events')
  async getUserEvents(@Param('id') userId: string) {
    return this.usersService.getUserEvents(userId);
  }

  // @UseGuards(JwtAuthGuard)
  @Post(':id/events')
  async addEventToUser(@Param('id') userId: string, @Body('eventId') eventId: string) {
    return this.usersService.addEventToUser(userId, eventId);
  }
  // POST('event)
  // async createAdminEvent(@Body(userId: string, eventDto: any, token: string) {
  //   return this.eventsService.getUserFromUserService(userId, token);
  // }

}
