import { ChatRoomProps } from "../../../@types/chat";
import InputField from "./InputField";

const ChatRoom = ({ children, selectedChannelId }: ChatRoomProps) => {
  return (
    <div className="chat-room">
      <ul className="messages">{children}</ul>
      <InputField channelId={selectedChannelId} />
    </div>
  );
};

export default ChatRoom;
