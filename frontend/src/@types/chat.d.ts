import { Socket } from "socket.io-client";
import { User } from "./user";

interface ChannelsProps {
  children: React.ReactNode;
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
  // selectedChannelId: number;
  // setSelectedChannelId: React.Dispatch<SetStateAction<number>>;
}

interface MessageProps extends SocketMessageData {
  userId: number | null;
}

interface ChatRoomProps {
  children: React.ReactNode;
  selectedChannelId: number;
}

interface ChatProps {
  initToUserId: number;
}
