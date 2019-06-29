import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { BasicStrategy } from 'passport-http';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(BasicStrategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(name: string, password: string): Promise<User> {
    return this.authService.validateUser(name, password);
  }
}
