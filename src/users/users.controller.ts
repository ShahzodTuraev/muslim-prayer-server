import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}
  @Get()
  findMany() {
    console.log('GET: route/users');
    return this.userServices.getUsers();
  }
}
