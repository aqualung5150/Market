import { useContext, useEffect, useState } from "react";
import { SocketMessageData, UseChatRoomProps } from "../../../types/chat";
import { SocketContext } from "../../../context/SocketContext";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";

const useChatRoom = ({ selectedChannelId }: UseChatRoomProps) => {
  const socket = useContext(SocketContext).socket;
  const userId = useSelector((state: RootState) => state.user.id);
  const [messagesData, setMessagesData] = useState<SocketMessageData[]>([]);

  useEffect(() => {
    if (!socket || !selectedChannelId) return;

    // Event
    const addNewMessage = (message: SocketMessageData) => {
      if (message.channelId === selectedChannelId) {
        if (message.sender.id !== userId) {
          socket.emit("readMessageReq", {
            messageId: message.id,
            senderId: message.sender.id,
          });
        }
        setMessagesData((prev) => prev.concat(message));
      }
    };

    const readMessage = (messageId: number) => {
      setMessagesData((prev) => {
        const target = prev.find((message) => message.id === messageId);
        if (target) target.read = true;

        return [...prev];
      });
    };

    const readMessages = (lastMessageAt: Date) => {
      setMessagesData((prev) => {
        prev.map((message: SocketMessageData) => {
          if (message.createdAt <= lastMessageAt) message.read = true;
        });

        return [...prev];
      });
    };

    const concatMessages = (messages: SocketMessageData[]) => {
      setMessagesData((prev) => prev.concat(messages));
    };

    // Listen
    socket.on("getMessagesRes", concatMessages);
    socket.on("sendMessageRes", addNewMessage);
    socket.on("readMessagesRes", readMessages);
    socket.on("readMessageRes", readMessage);
    // Emit
    socket.emit("getMessagesReq", { channelId: selectedChannelId });

    return () => {
      socket.off("getMessagesRes", concatMessages);
      socket.off("sendMessageRes", addNewMessage);
      socket.off("readMessagesRes", readMessages);
      socket.off("readMessageRes", readMessage);
    };
  }, [socket, selectedChannelId]);

  return { userId, messagesData };
};

export default useChatRoom;
