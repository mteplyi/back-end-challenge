import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';
import { AuthService } from '../auth/auth.service';
import { decodeCredentials, extractBasicToken } from '../../helpers/basic-auth.helpers';
import { MessageDto } from './dto/message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { mainConfig } from '../../config';
import { IncomingHttpHeaders, IncomingMessage } from 'http';

@WebSocketGateway(mainConfig.wsPort)
export class MessageGateway implements OnGatewayConnection<WebSocket>, OnGatewayDisconnect<WebSocket> {
  @WebSocketServer()
  private server: Server;
  private userIdsBySocket = new WeakMap<WebSocket, string>();
  private socketsByUserId = new Map<string, WebSocket[]>();

  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async handleConnection(socket: WebSocket, { headers }: IncomingMessage): Promise<void> {
    const user = await this.authorizeSocket(headers);
    if (!user) {
      socket.close(1008, 'Can not authorize socket!');
      return;
    }

    const { id: userId } = user;
    this.userIdsBySocket.set(socket, userId);
    const userSockets = this.socketsByUserId.get(userId);
    if (!userSockets) {
      this.socketsByUserId.set(userId, [socket]);
    } else {
      userSockets.push(socket);
    }
  }

  handleDisconnect(socket: WebSocket): void {
    const userId = this.userIdsBySocket.get(socket);
    this.socketsByUserId.delete(userId);
  }

  sendMessage(userIds: string[], messageDto: MessageDto): void {
    userIds.forEach((userId) => {
      const userSockets = this.socketsByUserId.get(userId);
      if (!userSockets) {
        return;
      }
      userSockets.forEach((socket) => {
        socket.send(JSON.stringify(messageDto));
      });
    });
  }

  private async authorizeSocket(incomingHttpHeaders: IncomingHttpHeaders): Promise<User | null> {
    const authorizationHeader = incomingHttpHeaders.authorization;
    if (!authorizationHeader) {
      return null;
    }

    const basicToken = extractBasicToken(authorizationHeader);
    if (!basicToken) {
      return null;
    }

    const credentialData = decodeCredentials(basicToken);
    if (!credentialData) {
      return null;
    }

    const { name, password } = credentialData;
    return this.authService.validateUser(name, password);
  }
}
