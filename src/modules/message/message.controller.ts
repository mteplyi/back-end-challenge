import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './message.service';
import { CurrentUser } from '../auth/user.decorator';
import { User } from '../user/user.entity';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('message')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async sendMessage(@CurrentUser() currentUser: User, @Body() sendMessageDto: SendMessageDto): Promise<{ result: string }> {
    return this.messageService.sendMessage(currentUser, sendMessageDto);
  }
}
