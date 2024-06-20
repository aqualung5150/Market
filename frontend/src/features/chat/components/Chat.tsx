import Channel from "./Channel";
import {
  ChatProps,
  SocketChannelData,
  SocketMessageData,
} from "../../../@types/chat";
import Message from "./Message";
import Channels from "./Channels";
import ChatRoom from "./ChatRoom";
import useChat from "../hooks/useChat";
import styles from "./Chat.module.css";
import myImg from "../../../assets/default_thumbnail.png";

const Chat = ({ initToUserId = 0 }: ChatProps) => {
  const {
    user,
    selectedChannelId,
    setSelectedChannelId,
    channelsData,
    messagesData,
  } = useChat(initToUserId);

  return (
    <div className="flex border border-grey rounded shadow-lg h-full">
      <div className="w-1/3 max-w-[420px] border flex flex-col select-none">
        <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center border">
          <div>
            <img
              className="min-w-10 w-10 h-10 rounded-full object-cover"
              src={myImg}
            />
          </div>
          <div className="flex">menu</div>
        </div>
        <div className="bg-grey-lighter flex-1 overflow-auto">
          {channelsData?.map((channelData: SocketChannelData) => (
            <Channel
              key={channelData.id}
              {...channelData}
              selectedChannelId={selectedChannelId}
              setSelectedChannelId={setSelectedChannelId}
            />
          ))}
        </div>
      </div>
      {selectedChannelId ? (
        <ChatRoom selectedChannelId={selectedChannelId}>
          {messagesData?.map((messageData: SocketMessageData) => (
            <Message key={messageData.id} {...messageData} userId={user.id} />
          ))}
        </ChatRoom>
      ) : (
        <div className="w-2/3 flex justify-center items-center">no room</div>
      )}
    </div>
  );
};

export default Chat;
