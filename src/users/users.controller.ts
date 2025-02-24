import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}
  @Public()
  @Get()
  findMany() {
    console.log('GET: route/users');
    return this.userServices.getUsers();
  }
  @Get('profile')
  getProfile(@Request() req: any): Promise<String> {
    return req.user.user_id;
  }
}
