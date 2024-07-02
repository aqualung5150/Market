import { ChatRoomProps, SocketMessageData } from "../../../types/chat";
import InputField from "./InputField";
import Message from "./Message";
import useChatRoom from "../hooks/useChatRoom";

const ChatRoom = ({ selectedChannelId }: ChatRoomProps) => {
  const { userId, messagesData, loader } = useChatRoom({
    selectedChannelId,
  });
  return (
    // <div className="w-2/3 flex-1 flex flex-col">
    <div className="w-full h-full flex-1 flex flex-col">
      <div className="py-2 px-3 bg-gray-100 flex flex-row justify-between items-center">
        Selected Channel is {selectedChannelId}
      </div>
      <div
        style={{ overflowAnchor: "none" }}
        className="py-2 px-3 flex-1 bg-stone-200 flex flex-col-reverse overflow-auto sticky"
      >
        {messagesData.map((messageData: SocketMessageData) => {
          return (
            <Message key={messageData.id} {...messageData} userId={userId} />
          );
        })}
        <div ref={loader} />
      </div>
      <InputField channelId={selectedChannelId} />
    </div>
  );
};

export default ChatRoom;
