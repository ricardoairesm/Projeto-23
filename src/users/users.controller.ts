import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';


@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('user')
  addUser(@Body() data: CreateUserDTO) {
    return this.usersService.addUser(data);
  }

  @Get('users')
  findAllUsers() {
    return this.usersService.getUsers();
  }
}
