import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // This request returns all users
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  // This request returns single user with particular id
  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }

  // This request creates new user
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.addUser(createUserDto);
  }

  // This request modifies data of particular user
  @Patch(':id')
  modifyUserData(@Param('id') id: number, @Body() body) {
    return this.usersService.modifyUser(id, body);
  }

  // This request removes user with particular id
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.removeUser(id);
  }
}
