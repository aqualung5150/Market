import { useContext, useEffect, useState } from "react";
import { SocketMessageData, UseChatRoomProps } from "../../../@types/chat";
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
          socket.emit("readMessageReq", { channelId: selectedChannelId });
        }
        setMessagesData((prev) => prev.concat(message));
      }
    };

    const readMessage = (channelId: number) => {
      if (channelId === selectedChannelId) {
        setMessagesData((prev) => {
          prev.map((message: SocketMessageData) => {
            if (message.sender.id === userId) message.read = true;
          });
          return [...prev];
        });
      }
    };
    // Listen
    socket.on("getMessagesRes", setMessagesData);
    socket.on("sendMessageRes", addNewMessage);
    socket.on("readMessageRes", readMessage);
    // Emit
    socket.emit("getMessagesReq", { channelId: selectedChannelId });
    socket.emit("readMessageReq", { channelId: selectedChannelId });

    return () => {
      socket.off("getMessagesRes", setMessagesData);
      socket.off("sendMessageRes", addNewMessage);
      socket.off("readMessageRes", readMessage);
    };
  }, [socket, selectedChannelId]);

  return { userId, messagesData };
};

export default useChatRoom;
