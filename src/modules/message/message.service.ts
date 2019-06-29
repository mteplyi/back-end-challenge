import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { MessageGateway } from './message.gateway';
import { SendMessageDto } from './dto/send-message.dto';
import { MessageDto } from './dto/message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../room/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly messageGateway: MessageGateway,
  ) {}

  async sendMessage({ id: currentUserId }: User, sendMessageDto: SendMessageDto) {
    const { roomId } = sendMessageDto;

    const room = await this.roomRepository.findOne(roomId, {
      loadRelationIds: { relations: ['users'], disableMixedMap: true },
    });
    if (!room) {
      throw new NotFoundException(`Room with id=${roomId} not found!`);
    }

    const userIds = room.users.map(({ id }) => id);
    if (userIds.every((id) => id !== currentUserId)) {
      throw new ForbiddenException(`User with id=${currentUserId} does not have permission to send messages into room with id=${roomId}!`);
    }

    const messageDto = new MessageDto({
      ...sendMessageDto,
      userId: currentUserId,
    });
    this.messageGateway.sendMessage(userIds, messageDto);

    return { result: 'message successfully sent' };
  }
}
