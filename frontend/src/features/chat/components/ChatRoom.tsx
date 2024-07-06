import { ChatRoomProps, SocketMessageData } from "../../../types/chat";
import InputField from "./InputField";
import Message from "./Message";
import useChatRoom from "../hooks/useChatRoom";

const ChatRoom = ({ selectedChannelId }: ChatRoomProps) => {
  const { messagesData, loader } = useChatRoom({
    selectedChannelId,
  });
  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <div className="flex flex-row items-center justify-between bg-gray-100 px-3 py-2">
        Selected Channel is {selectedChannelId}
      </div>
      <div
        style={{ overflowAnchor: "none" }}
        className="sticky flex flex-1 flex-col-reverse overflow-auto bg-stone-200 px-3 py-2"
      >
        {messagesData.map((messageData: SocketMessageData) => {
          return <Message key={messageData.id} data={messageData} />;
        })}
        <div ref={loader} />
      </div>
      <InputField channelId={selectedChannelId} />
    </div>
  );
};

export default ChatRoom;
