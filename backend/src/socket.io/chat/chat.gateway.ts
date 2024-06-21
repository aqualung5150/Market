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
  async handleGetMessages(client: ChatSocket, { channelId }) {
    const messages = await this.chatService.getMessagesByChannelId(channelId);
    client.emit('getMessagesRes', messages);
  }

  @SubscribeMessage('sendMessageReq')
  async handleSendMessage(client: ChatSocket, { body, channelId }) {
    const newMessage = await this.chatService.createMessage(
      body,
      client.userId,
      channelId,
    );
    const users = await this.chatService.getUsersByChannelId(channelId);

    users.map((user) => {
      this.io.to(user.id.toString()).emit('sendMessageRes', newMessage);
    });
  }

  // @SubscribeMessage('createChannelReq')
  // async handleNewChannel(client: ChatSocket, { toUserId }) {
  //   const channel = await this.chatService.createChannel(
  //     client.userId,
  //     toUserId,
  //   );

  //   const users: SocketUserData[] = [];
  //   channel.users.map((user) => {
  //     users.push(user.user);
  //   });

  //   const data = {
  //     id: channel.id,
  //     users: users,
  //   };

  //   this.io.to(client.userId.toString()).emit('getChannelRes', data);
  //   this.io.to(toUserId.toString()).emit('getChannelRes', data);

  //   client.emit('createChannelRes', channel.id);
  // }

  // @SubscribeMessage('deleteChannelReq')
  // async handleDeleteChannel(client: ChatSocket, { channelId }) {
  //   this.logger.debug('deleteChannelReq ' + channelId);
  //   const messages = await this.chatService.getMessagesByChannelId(channelId);
  //   if (messages.length > 0) return;
  //   await this.chatService.deleteChannelByChannelId(channelId);
  // }

  @SubscribeMessage('readMessageReq')
  async handleReadMessage(client: ChatSocket, { channelId }) {
    this.logger.debug('readMessageReq');
    this.chatService.readMessages(client.userId, channelId);

    const users = await this.chatService.getUsersByChannelId(channelId);
    const toUser = users.find((user) => user.id !== client.userId);
    this.io.to(toUser.id.toString()).emit('readMessageRes', channelId);
  }

  @SubscribeMessage('createChannelReq')
  async handleCreateChannel(client: ChatSocket, { body, toUserId }) {
    const channel = await this.chatService.createChannel(
      client.userId,
      toUserId,
    );
    const message = await this.chatService.createMessage(
      body,
      client.userId,
      channel.id,
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
    this.io.to(toUserId.toString()).emit('getChannelRes', data);
    client.emit('createChannelRes', channel.id);
  }
}
