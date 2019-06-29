import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with id=${userId} not found!`);
    }
    return user;
  }
}
