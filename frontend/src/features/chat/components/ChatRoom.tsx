import { ChatRoomProps, SocketMessageData } from "../../../@types/chat";
import InputField from "./InputField";
import Message from "./Message";
import useChatRoom from "../hooks/useChatRoom";

const ChatRoom = ({ socket, userId, selectedChannelId }: ChatRoomProps) => {
  const { messagesData } = useChatRoom({ socket, userId, selectedChannelId });

  return (
    <div className="w-2/3 flex-1 border flex flex-col">
      <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
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
