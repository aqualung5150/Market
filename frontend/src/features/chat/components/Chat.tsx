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

const Chat = ({ initToUserId = 0 }: ChatProps) => {
  const {
    user,
    selectedChannelId,
    setSelectedChannelId,
    channelsData,
    messagesData,
  } = useChat(initToUserId);

  return (
    <div className="container">
      <div className="channels">
        <Channels>
          {channelsData?.map(
            (channelData: SocketChannelData) =>
              channelData.lastMessage && (
                <Channel
                  key={channelData.id}
                  {...channelData}
                  setSelectedChannelId={setSelectedChannelId}
                />
              )
          )}
        </Channels>
      </div>
      <div className="body">
        {selectedChannelId ? (
          <div>
            <h1>Selected Channel is {selectedChannelId}</h1>
            <ChatRoom selectedChannelId={selectedChannelId}>
              {messagesData?.map((messageData: SocketMessageData) => (
                <Message
                  key={messageData.id}
                  {...messageData}
                  userId={user.id}
                />
              ))}
            </ChatRoom>
          </div>
        ) : (
          <div>no room</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
