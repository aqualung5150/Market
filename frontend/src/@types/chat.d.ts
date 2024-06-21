import { Socket } from "socket.io-client";
import { User } from "./user";

interface ChannelsProps {
  socket: Socket | null;
  userId: number | null;
  selectedChannelId: number;
  setSelectedChannelId: React.Dispatch<SetStateAction<number>>;
}

interface InputFieldProps {
  channelId: number;
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
  senderId: number;
  users: SocketUserData[];
}

interface ChannelProps extends SocketChannelData {
  userId: number | null;
}

interface MessageProps extends SocketMessageData {
  userId: number | null;
}

interface ChatRoomProps {
  socket: Socket | null;
  userId: number | null;
  selectedChannelId: number;
}

interface ChatProps {
  initToUserId: number;
}

interface ChatBodyProps {
  children: React.ReactNode;
}

interface NewChatProps {
  socket: Socket | null;
  sendTo: number;
}

interface useChannelsProps {
  socket: Socket | null;
  userId: number | null;
  selectedChannelId: number;
}

interface ChatHeaderProps {
  nickname: string;
}

interface useChatRoomProps extends useChannelsProps {}
