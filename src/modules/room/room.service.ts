import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { User } from '../user/user.entity';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<Room[]> {
    return this.roomRepository.find({ relations: ['users'] });
  }

  async getOne(roomId): Promise<Room> {
    const room = await this.roomRepository.findOne(roomId, { relations: ['users'] });
    if (!room) {
      throw new NotFoundException(`Room with id=${roomId} not found!`);
    }
    return room;
  }

  async create({ id: currentUserId }: User, { name }: CreateRoomDto): Promise<Room> {
    const room = await this.roomRepository.create({ name, creatorId: currentUserId });
    return this.roomRepository.save(room);
  }

  async delete({ id: currentUserId }: User, roomId: string): Promise<{ result: string }> {
    const room = await this.roomRepository.findOne(roomId);
    if (!room) {
      throw new NotFoundException(`Room with id=${roomId} not found!`);
    }

    if (room.creatorId !== currentUserId) {
      throw new ForbiddenException(`User with id=${currentUserId} has not permission to delete room with id=${roomId}!`);
    }

    await this.roomRepository.remove(room);

    return { result: 'room removed successfully' };
  }

  async join(currentUser: User, roomId: string): Promise<{ result: string }> {
    const room = await this.roomRepository.findOne(roomId, { relations: ['users'] });
    if (!room) {
      throw new NotFoundException(`Room with id=${roomId} not found!`);
    }

    if (room.users.some(({ id }) => id === currentUser.id)) {
      throw new NotAcceptableException(`User with id=${currentUser.id} is already in room with id=${roomId}!`);
    }

    room.users.push(currentUser);
    await this.roomRepository.save(room);

    return { result: 'user successfully joined the room' };
  }

  async leave({ id: currentUserId }: User, roomId: string): Promise<{ result: string }> {
    const room = await this.roomRepository.findOne(roomId, { relations: ['users'] });
    if (!room) {
      throw new NotFoundException(`Room with id=${roomId} not found!`);
    }

    const userIndex = room.users.findIndex(({ id }) => id === currentUserId);
    if (userIndex === -1) {
      throw new NotAcceptableException(`User with id=${currentUserId} is not in room with id=${roomId}!`);
    }

    room.users.splice(userIndex, 1);
    await this.roomRepository.save(room);

    return { result: 'user successfully left the room' };
  }
}
