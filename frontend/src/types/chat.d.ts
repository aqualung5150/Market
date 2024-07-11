import { Socket } from "socket.io-client";
import { PublicUser } from "./user";

interface ChannelsProps {
  selectedChannelId: number;
  setSelectedChannelId: React.Dispatch<SetStateAction<number>>;
}

interface MessageInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
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

interface ChatRoomProps {
  selectedChannelId: number;
}
