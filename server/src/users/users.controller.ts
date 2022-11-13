import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { EmailValidationPipe } from './../common/pipes/email-validation.pipe';
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
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  // This request creates new user
  @Post()
  createUser(@Body(EmailValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.addUser(createUserDto);
  }

  // This request modifies data of particular user
  @Patch(':id')
  modifyUserData(
    @Param('id', ParseIntPipe) id: number,
    @Body(EmailValidationPipe) body,
  ) {
    return this.usersService.modifyUser(id, body);
  }

  // This request removes user with particular id
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.removeUser(id);
  }
}
