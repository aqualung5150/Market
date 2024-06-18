import { Socket } from 'socket.io';

interface ChatSocket extends Socket {
  userId: number;
}

interface SocketUserData {
  id: number;
  nickname: string;
}

interface SocketMessageData {
  id: number;
  body: string;
  read: boolean;
  createdAt: Date;
  channelId: number;
  sender: SocketUserData;
}

interface SocketChannelData {
  id: number;
  lastMessage: string;
  lastMessageDate: Date;
  read: boolean;
  users: SocketUserData[];
}
