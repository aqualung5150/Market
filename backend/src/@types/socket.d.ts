import { Socket } from 'socket.io';

interface ChatSocket extends Socket {
  userId: number;
  // name: string;
  // email: string;
  // nickname: string;
  // curRoom: string;
}

// interface ChatSocket extends Socket, ChatUser {}

//////////////

interface SocketUserData {
  id: number;
  nickname: string;
}

interface SocketMessageData {
  // id: number;
  body: string;
  read: boolean;
  createdAt: string;
  channelId: number;
  sender: SocketUserData;
}

interface SocketChannelData {
  id: number;
  lastMessage: string;
  lastMessageDate: string;
  read: boolean;
  users: SocketUserData[];
}
