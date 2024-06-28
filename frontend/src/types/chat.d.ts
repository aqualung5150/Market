import { Socket } from "socket.io-client";
import { PublicUser } from "./user";

interface ChannelsProps {
  selectedChannelId: number;
  setSelectedChannelId: React.Dispatch<SetStateAction<number>>;
}

interface InputFieldProps {
  channelId: number;
}

interface SocketMessageData {
  id: number;
  body: string;
  read: boolean;
  createdAt: Date;
  channelId: number;
  sender: PublicUser;
}

interface SocketChannelData {
  id: number;
  lastMessage: string;
  lastMessageDate: Date;
  read: boolean;
  senderId: number;
  users: PublicUser[];
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
interface UseChannelsProps extends ChannelsProps {}
