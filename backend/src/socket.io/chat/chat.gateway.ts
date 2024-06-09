import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { ChatSocket } from 'src/@types/socket';

@WebSocketGateway({
  namespace: 'chat',
  pingTimeout: 2000,
  pingInterval: 5000,
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() io: Namespace;

  private readonly logger = new Logger(ChatGateway.name);

  // todo
  afterInit() {
    this.logger.debug('Server Start');
  }
  handleConnection(@ConnectedSocket() client: ChatSocket) {
    this.logger.debug(`Client Connected : ${client.nickname}, ${client.id}`);
  }
  handleDisconnect(@ConnectedSocket() client: ChatSocket) {
    this.logger.debug(`Client Disconnected : ${client.nickname}, ${client.id}`);
  }
  ////////////////////////////////////////////////
}
