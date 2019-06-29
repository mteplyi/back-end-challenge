import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Room } from './room.entity';
import { RoomService } from './room.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRoomDto } from './dto/create-room.dto';
import { CurrentUser } from '../auth/user.decorator';
import { User } from '../user/user.entity';

@Controller('rooms')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getAll(): Promise<Room[]> {
    return this.roomService.getAll();
  }

  @Get(':roomId')
  async getOne(@Param('roomId') roomId: string): Promise<Room> {
    return this.roomService.getOne(roomId);
  }

  @Post()
  async create(@CurrentUser() currentUser: User, @Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomService.create(currentUser, createRoomDto);
  }

  @Delete(':roomId')
  async delete(@CurrentUser() currentUser: User, @Param('roomId') roomId: string): Promise<{ result: string }> {
    return this.roomService.delete(currentUser, roomId);
  }

  @Post(':roomId/join')
  async join(@CurrentUser() currentUser: User, @Param('roomId') roomId: string): Promise<{ result: string }> {
    return this.roomService.join(currentUser, roomId);
  }

  @Post(':roomId/leave')
  async leave(@CurrentUser() currentUser: User, @Param('roomId') roomId): Promise<{ result: string }> {
    return this.roomService.leave(currentUser, roomId);
  }
}
