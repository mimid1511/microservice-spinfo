import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiSecurity,
} from '@nestjs/swagger';

// @UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieve a list of all users. Requires ADMIN role.',
  })
  @ApiResponse({ status: 200, type: [Object] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieve a user by their ID. Requires ADMIN role.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to retrieve',
    type: String,
  })
  @ApiResponse({ status: 200, type: Object })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':id')
  @Roles('ADMIN')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new user',
    description:
      'Create a new user. No authentication required for this endpoint.',
  })
  @ApiBody({ description: 'Data for creating a new user', type: Object }) // Replace Object with a specific DTO class if available
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createUserDto: any) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({
    summary: 'Update a user',
    description: 'Update user details. Requires ADMIN or USER role.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to update',
    type: String,
  })
  @ApiBody({ description: 'Data for updating a user', type: Object }) // Replace Object with a specific DTO class if available
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  @Roles('ADMIN', 'USER')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Delete a user',
    description: 'Delete a user by ID. Requires ADMIN or USER role.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to delete',
    type: String,
  })
  @ApiResponse({ status: 204, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  @Roles('ADMIN', 'USER')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
