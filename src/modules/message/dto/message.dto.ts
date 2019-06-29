import { SendMessageDto } from './send-message.dto';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class MessageDto extends SendMessageDto {
  @Expose({ name: 'user_id' })
  @IsNotEmpty()
  userId: string;

  constructor(messageDto: MessageDto) {
    super();
    Object.assign(this, messageDto);
  }
}
