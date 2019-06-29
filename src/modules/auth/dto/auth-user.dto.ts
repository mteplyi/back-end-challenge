import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AuthUserDto {
  @Expose({ name: 'user_name' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
