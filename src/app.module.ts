import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { RoomModule } from './modules/room/room.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessageModule } from './modules/message/message.module';
import { databaseConfig } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UserModule,
    RoomModule,
    AuthModule,
    MessageModule,
  ],
})
export class AppModule {}
