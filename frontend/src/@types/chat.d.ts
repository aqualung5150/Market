import { Socket } from "socket.io-client";
import { User } from "./user";

interface ChannelsProps {
  selectedChannelId: number;
  setSelectedChannelId: React.Dispatch<SetStateAction<number>>;
}

interface InputFieldProps {
  channelId: number;
}

interface SocketUserData {
  id: number;
  nickname: string;
  image: string;
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
  selectedChannelId: number;
}

interface ChatProps {
  initToUserId: number;
}

interface ChatBodyProps {
  children: React.ReactNode;
}

interface UseChatRoomProps extends ChatRoomProps {}
interface UseChannelsProps extends ChatRoomProps {}
