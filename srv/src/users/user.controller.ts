import { UserService } from './users.service';
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UsersResponseDto } from './users.response.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get('?')
  async getAllUsers(@Query('page') page: string, @Query('take') take: string) {
    this.logger.log('Get all users');
    const { users, count } = await this.userService.findAll(Number(page), Number(take));
    return { users: users.map((user) => UsersResponseDto.fromUsersEntity(user)), count };
  }
}
