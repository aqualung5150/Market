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

  @SubscribeMessage('getChannelsReq')
  // 클라이언트가 속한 모든 채널을 조회하면서 room에 join 시켜줘야함
  handleGetChannelsReq(client: ChatSocket) {
    this.logger.debug('getChannelsReq');
  }

  @SubscribeMessage('getMessagesReq')
  handleGetMessagesReq(client: ChatSocket) {
    this.logger.debug('getMessagesReq');
  }

  @SubscribeMessage('sendMessageReq')
  handleSendMessageReq(client: ChatSocket, payload) {
    this.io
      .to(`${payload.channelId}`)
      .emit('sendMessageRes', payload.body + ' - ' + payload.channelId);
  }

  @SubscribeMessage('newChannelReq')
  handleNewChannelReq(client: ChatSocket, payload) {
    /*
    payload = {
      toUser: number
      message: string
    }

    1. 새로운 채널 생성
    2. 채널에 client와 toUser
      -> toUser의 소켓id를 어디서 찾을것인가
      1. 소켓에 연결될때 db에 저장 -> 디스크
      2. map<userId, User> 로 저장해둘 것인가 -> 메모리
    */
  }
}
