import { Socket } from "socket.io-client";

interface MessageInfo {
  id: number;
  // 중간에 닉네임을 바꾼다면 A->B로 바뀌었다고 메시지만 띄워주자
  //(db데이터는 변경/프론트에서는 새로 데이터를 받아왔을때만 바뀐 닉네임이 표시됨)
  sender: string; // User.nickname
  body: string;
  read: boolean;
  createdAt: number;
}

interface ChannelInfo {
  id: number;
  users: string[]; // User.nickname
  lastMessage: Message; // include createdAt
}

interface ChannelProps extends ChannelInfo {
  setSelectedChannelId: React.Dispatch<SetStateAction<number>>;
}

interface ChannelsProps {
  channels: Channel[];
  setSelectedChannelId: React.Dispatch<SetStateAction<number>>;
}

interface InputFieldProps {
  socket: Socket | null;
  channelId: number;
  //   setMessages: React.Dispatch<SetStateAction<Message[]>>;
}

// interface sendMessageParam {
//     messag
// }
