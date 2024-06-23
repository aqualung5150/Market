import { ChatRoomProps, SocketMessageData } from "../../../@types/chat";
import InputField from "./InputField";
import Message from "./Message";
import useChatRoom from "../hooks/useChatRoom";

const ChatRoom = ({ selectedChannelId }: ChatRoomProps) => {
  const { userId, messagesData } = useChatRoom({ selectedChannelId });

  return (
    <div className="w-2/3 flex-1 flex flex-col">
      <div className="py-2 px-3 bg-gray-100 flex flex-row justify-between items-center">
        Selected Channel is {selectedChannelId}
      </div>
      <div className="flex-1 bg-stone-200 flex flex-col-reverse overflow-auto">
        <div className="py-2 px-3 ">
          {messagesData?.map((messageData: SocketMessageData) => (
            <Message key={messageData.id} {...messageData} userId={userId} />
          ))}
        </div>
      </div>
      <InputField channelId={selectedChannelId} />
    </div>
  );
};

export default ChatRoom;
