import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../room/room.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Room]),
    AuthModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway],
})
export class MessageModule {}
