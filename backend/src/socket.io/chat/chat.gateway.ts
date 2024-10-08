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
import {
  ChatSocket,
  SocketChannelData,
  SocketMessageData,
  SocketUserData,
} from 'src/@types/socket';
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
  // pingTimeout: 20000, // default 20000ms
  // pingInterval: 25000,// default 25000ms
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
    client.join(client.userId.toString());
  }
  handleDisconnect(@ConnectedSocket() client: ChatSocket) {
    this.logger.debug(`disconnected : ${client.userId}, ${client.id}`);
  }

  @SubscribeMessage('getChannelsReq')
  async handleGetChannels(client: ChatSocket) {
    const channels = await this.chatService.getChannelsByUserId(client.userId);

    const payload: SocketChannelData[] = [];
    channels.map((channel) => {
      const users: SocketUserData[] = [];
      channel.users.map((user) => {
        users.push(user.user);
      });

      const data: SocketChannelData = {
        id: channel.id,
        lastMessage: channel.messages[0]?.body,
        lastMessageDate: channel.messages[0]?.createdAt,
        read: channel.messages[0]?.read,
        senderId: channel.messages[0]?.sender.id,
        users: users,
      };

      payload.push(data);
    });

    payload.sort((a, b) => {
      if (a.lastMessageDate < b.lastMessageDate) return 1;
      else if (a.lastMessageDate > b.lastMessageDate) return -1;
      else return 0;
    });

    client.emit('getChannelsRes', payload);
  }

  @SubscribeMessage('getMessagesReq')
  async handleGetMessages(client: ChatSocket, { channelId, cursor }) {
    const pageSize = 10;
    const { messages, notMe } = await this.chatService.getReadMessages(
      client.userId,
      channelId,
      cursor,
      pageSize,
    );
    const nextCursor =
      messages.length < pageSize ? -1 : messages[messages.length - 1].id;
    client.emit('getMessagesRes', { messages, nextCursor });
    this.io
      .to(notMe.id.toString())
      .emit('readMessagesRes', messages[0]?.createdAt);
  }

  @SubscribeMessage('getRoomUsersReq')
  async handleGetRoomUsers(client: ChatSocket, { selectedChannelId }) {
    const users = await this.chatService.getUsersByChannelId(selectedChannelId);
    client.emit('getRoomUsersRes', users);
  }

  @SubscribeMessage('sendMessageReq')
  async handleSendMessage(client: ChatSocket, { body, channelId }) {
    const { message, users } = await this.chatService.createMessage(
      body,
      client.userId,
      channelId,
    );

    users.map((user) => {
      this.io.to(user.id.toString()).emit('sendMessageRes', message);
    });
  }

  @SubscribeMessage('readMessageReq')
  async handleReadMessage(client: ChatSocket, { messageId, senderId }) {
    await this.chatService.readMessage(messageId);
    this.io.to(senderId.toString()).emit('readMessageRes', messageId);
  }

  @SubscribeMessage('createChannelReq')
  async handleCreateChannel(client: ChatSocket, { body, sendTo }) {
    const { channel, message } = await this.chatService.createChannel(
      client.userId,
      sendTo,
      body,
    );

    const users: SocketUserData[] = [];
    channel.users.map((user) => {
      users.push(user.user);
    });

    const data: SocketChannelData = {
      id: channel.id,
      lastMessage: message.body,
      lastMessageDate: message.createdAt,
      read: message.read,
      senderId: message.sender.id,
      users: users,
    };

    this.io.to(client.userId.toString()).emit('getChannelRes', data);
    this.io.to(sendTo.toString()).emit('getChannelRes', data);
    client.emit('createChannelRes', channel.id);
  }
}
