import { Socket } from 'socket.io';

interface ChatSocket extends Socket {
  userId: number;
  // name: string;
  // email: string;
  // nickname: string;
  // curRoom: string;
}

// interface ChatSocket extends Socket, ChatUser {}
