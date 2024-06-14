import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
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
import { ChatService } from './chat.service';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }),
)
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
  constructor(private readonly chatService: ChatService) {}

  afterInit() {}
  async handleConnection(@ConnectedSocket() client: ChatSocket) {
    this.logger.debug(`connected : ${client.userId}, ${client.id}`);
    client.join(client.userId);

    const channel = await this.chatService.createChannel(client.userId, 2);
    await this.chatService.createMessage(
      'new message',
      client.userId,
      channel.id,
    );
    const channels = await this.chatService.getChannelByUserId(client.userId);

    channels.forEach((value) => {
      this.logger.debug(
        value.users[0].userId,
        value.users[1].userId,
        value.messages[0],
      );
    });
  }
  handleDisconnect(@ConnectedSocket() client: ChatSocket) {
    this.logger.debug(`disconnected : ${client.userId}, ${client.id}`);
  }

  // @SubscribeMessage('hello')
  // handleEvent(client: ChatSocket, data: string) {
  //   this.logger.debug('hello!');
  //   client.emit('hello', 'client: ' + data + '/server: yes you.');
  // }

  @SubscribeMessage('getChannelsReq')
  // ??? 클라이언트가 속한 모든 채널을 조회하면서 room에 join 시켜줘야함
  async handleGetChannelsReq(client: ChatSocket) {
    /*
    const channels = await getChannelsByUserId(payload.userId);
    client.emit('getChannelsRes', {channels: channels})
    */
    this.logger.debug('getChannelsReq');
  }

  @SubscribeMessage('getMessagesReq')
  async handleGetMessagesReq(client: ChatSocket) {
    /*
    const messages = await getMessagesByChannelId(payload.channelId);
    client.emit('getmessagesRes', {messages: messages});
    */
    this.logger.debug('getMessagesReq');
  }

  @SubscribeMessage('sendMessageReq')
  async handleSendMessageReq(client: ChatSocket, payload) {
    /*
    const message = await creatMessage({
      senderId: client.userId,
      channelId: payload.channelId,
      body: payload.body,
    })
    const users = await getUsersByChannelId(payload.channelId);
    users.map((user) => {
      this.io.to(user.id.toString()).emit('sendMessageRes', {message: message});
    })
    */
  }

  @SubscribeMessage('newChannelReq')
  async handleNewChannelReq(client: ChatSocket, payload) {
    /*
    const channel = await createChannel();

    // createChannel안에 넣을까
    await ChannelParticipants({
      userId: client.userId,
      channelId: channel.id;
    })

    const message = await createMessage({
      senderId: client.userId,
      channelid: channel.id
      body: payload.body,
    });

    client.emit('newChannelRes', {channel: channel});
    */
  }
}
