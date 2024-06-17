import { useCallback, useEffect, useState } from "react";
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
      console.log("왜 메세지 안보임?", message.channelId, selectedChannelId);
      if (message.channelId === selectedChannelId)
        setMessagesData((prev) => prev.concat(message));
    });

    return () => {
      if (messagesData.length === 0) {
        console.log(messagesData.length);
        socket.emit("deleteChannelReq", { selectedChannelId });
      }

      socket.off("getMessagesRes");
      socket.off("sendMessageRes");
    };
  }, [socket, selectedChannelId]);

  useEffect(() => {
    if (selectedChannelId <= 0) return;
    socket?.emit("getMessagesReq", { channelId: selectedChannelId });
  }, [selectedChannelId]);

  return (
    <div className="chat-room">
      <ul className="messages">
        {messagesData.map((messageData: SocketMessageData) => (
          <Message key={messageData.id} {...messageData} userId={userId} />
        ))}
      </ul>
      <InputField socket={socket} channelId={selectedChannelId} type={"send"} />
    </div>
  );
};

export default ChatRoom;
