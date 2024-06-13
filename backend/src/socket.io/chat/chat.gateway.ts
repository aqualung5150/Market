import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
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
  // pingTimeout: 2000, // default 20000ms
  // pingInterval: 5000,// default 25000ms
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() io: Namespace;

  private readonly logger = new Logger(ChatGateway.name);

  afterInit() {}
  handleConnection(@ConnectedSocket() client: ChatSocket) {
    this.logger.debug(`connected : ${client.nickname}, ${client.id}`);
    client.emit('hello', 'this is server');
  }
  handleDisconnect(@ConnectedSocket() client: ChatSocket) {
    this.logger.debug(`disconnected : ${client.nickname}, ${client.id}`);
  }

  // @SubscribeMessage('hello')
  // handleEvent(client: ChatSocket, data: string) {
  //   this.logger.debug('hello!');
  //   client.emit('hello', 'client: ' + data + '/server: yes you.');
  // }

  @SubscribeMessage('sendMessage')
  handleSendMessage(client: ChatSocket, payload) {
    this.logger.debug(payload.body + ' - ' + payload.channelId);
  }
}
