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
  async handleGetChannelsReq(client: ChatSocket) {
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
        lastMessageDate: channel.messages[0]?.createdAt?.toString(),
        read: channel.messages[0]?.read,
        users: users,
      };

      payload.push(data);
    });

    payload.sort((a, b) => {
      if (a.lastMessageDate < b.lastMessageDate) return 1;
      else if (a.lastMessageDate > b.lastMessageDate) return -1;
      else return 0;
    });

    client.emit('getChannelsRes', { channels: payload });
  }

  @SubscribeMessage('getMessagesReq')
  async handleGetMessagesReq(client: ChatSocket, { channelId }) {
    const messages = await this.chatService.getMessagesByChannelId(channelId);
    client.emit('getMessagesRes', { messages: messages });
  }

  @SubscribeMessage('sendMessageReq')
  async handleSendMessageReq(client: ChatSocket, { body, channelId }) {
    const newMessage = await this.chatService.createMessage(
      body,
      client.userId,
      channelId,
    );
    const users = await this.chatService.getUsersByChannelId(channelId);

    const message: SocketMessageData = {
      id: newMessage.id,
      body: newMessage.body,
      read: newMessage.read,
      createdAt: newMessage.createdAt.toString(),
      channelId: newMessage.channelId,
      sender: {
        id: newMessage.sender.id,
        nickname: newMessage.sender.nickname,
      },
    };

    users.map((user) => {
      this.io
        .to(user.id.toString())
        .emit('sendMessageRes', { message: message });
    });
  }

  @SubscribeMessage('createChannelReq')
  async handleNewChannelReq(client: ChatSocket, { toUserId }) {
    this.logger.debug('createChannelReq');
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
    //todo
    // const channel = await this.chatService.createChannel(client.userId, toUserId);
    // const message = await this.chatService.createMessage(body, client.userId, channel.id);
    // channel.users.map((user) => {
    //   user.user.id .......?
    // })
    ////////////////
    /*
     */

    const newChannel = await this.chatService.createChannel(
      client.userId,
      toUserId,
    );
    // const message = await this.chatService.createMessage(
    //   body,
    //   client.userId,
    //   newChannel.id,
    // );

    const channel = await this.chatService.getChannelByChannelId(newChannel.id);

    const users: SocketUserData[] = [];
    channel.users.map((user) => {
      users.push(user.user);
    });

    const data: SocketChannelData = {
      id: channel.id,
      lastMessage: channel.messages[0]?.body,
      lastMessageDate: channel.messages[0]?.createdAt?.toString(),
      read: channel.messages[0]?.read,
      users: users,
    };

    this.io
      .to(client.userId.toString())
      .emit('getChannelRes', { channel: data });
    this.io.to(toUserId.toString()).emit('getChannelRes', { channel: data });

    client.emit('createChannelRes', { channelId: channel.id });
  }

  @SubscribeMessage('deleteChannelReq')
  async handleDeleteChannelReq(client: ChatSocket, { channelId }) {
    // todo
    this.logger.debug('deleteChannelReq ' + channelId);
  }
}
