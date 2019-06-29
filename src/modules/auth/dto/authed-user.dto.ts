import { User } from '../../user/user.entity';
import { IsNotEmpty } from 'class-validator';

export class AuthedUserDto extends User {
  @IsNotEmpty()
  credentials: string;

  constructor(authedUserDto: AuthedUserDto) {
    super();
    Object.assign(this, authedUserDto);
  }
}
