import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { AuthModule } from '../auth/auth.module';
import { User } from '../user/user.entity';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, User]),
    AuthModule,
    MessageModule,
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
