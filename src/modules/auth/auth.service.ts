import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthedUserDto } from './dto/authed-user.dto';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { encodeCredentials } from '../../helpers/basic-auth.helpers';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async authorize({ name, password }: AuthUserDto): Promise<AuthedUserDto> {
    let user = await this.userRepository.findOne({ name });
    if (!user) {
      user = await this.userRepository.create({ name, password });
      user = await this.userRepository.save(user);
    } else if (user.password !== password) {
      throw new UnauthorizedException();
    }
    const credentials = encodeCredentials({ name, password });
    return new AuthedUserDto({ ...user, credentials });
  }

  async validateUser(name: string, password: string): Promise<User> {
    return this.userRepository.findOne({ name, password });
  }
}
