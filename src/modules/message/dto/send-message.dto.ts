import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class SendMessageDto {
  @Expose({ name: 'room_id' })
  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  message: string;
}
