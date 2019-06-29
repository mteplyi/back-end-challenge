import { ClassSerializerInterceptor, Controller, Get, Param, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':userId')
  async getOne(@Param('userId') userId: string): Promise<User> {
    return this.userService.getOne(userId);
  }
}
