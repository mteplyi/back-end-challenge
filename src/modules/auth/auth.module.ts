import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { HttpStrategy } from './http-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'basic',
      session: false,
      property: 'user',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, HttpStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
