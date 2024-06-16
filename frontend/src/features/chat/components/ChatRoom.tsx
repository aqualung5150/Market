import { useEffect, useState } from "react";
import { ChatRoomProps, SocketMessageData } from "../../../@types/chat";
import Message from "./Message";
import InputField from "./InputField";

const ChatRoom = ({ socket, userId, selectedChannelId }: ChatRoomProps) => {
  const [messagesData, setMessagesData] = useState<SocketMessageData[]>([]);

  useEffect(() => {
    if (!socket) return;
    socket.on("getMessagesRes", ({ messages }) => {
      setMessagesData(messages);
    });

    socket.on("sendMessageRes", ({ message }) => {
      console.log(message.id);
      setMessagesData((prev) => prev.concat(message));
    });
  }, [socket]);

  return (
    <div className="chat-room">
      <ul className="messages">
        {messagesData.map((messageData: SocketMessageData) => (
          <Message key={messageData.id} {...messageData} userId={userId} />
        ))}
      </ul>
      <InputField socket={socket} channelId={selectedChannelId} />
    </div>
  );
};

export default ChatRoom;
