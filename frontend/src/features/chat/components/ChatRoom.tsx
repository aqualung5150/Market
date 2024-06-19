import { ChatRoomProps } from "../../../@types/chat";
import InputField from "./InputField";

const ChatRoom = ({ children, selectedChannelId }: ChatRoomProps) => {
  return (
    <div className="w-2/3 border flex flex-col">
      {/* Header */}
      <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
        Selected Channel is {selectedChannelId}
      </div>
      {/* Body */}
      <div className="flex-1 bg-stone-200">
        <div className="py-2 px-3">{children}</div>
        <InputField channelId={selectedChannelId} />
      </div>
    </div>
  );
};

export default ChatRoom;
