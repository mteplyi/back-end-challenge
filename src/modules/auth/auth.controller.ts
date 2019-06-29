import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthedUserDto } from './dto/authed-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('login')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async authorize(@Body() authUserDto: AuthUserDto): Promise<AuthedUserDto> {
    return this.authService.authorize(authUserDto);
  }
}
