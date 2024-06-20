import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../context/SocketContext";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { SocketChannelData, SocketMessageData } from "../../../@types/chat";

const useChat = (initToUserId: number) => {
  const socket = useContext(SocketContext).socket;
  const user = useSelector((state: RootState) => state.user);
  const [selectedChannelId, setSelectedChannelId] = useState(0);
  const [channelsData, setChannelsData] = useState<SocketChannelData[]>([]);
  const [messagesData, setMessagesData] = useState<SocketMessageData[]>([]);

  useEffect(() => {
    if (!socket) return;

    // Event
    // Get New Channel
    const addNewChannel = (channel: SocketChannelData) => {
      setChannelsData((prev) => {
        prev.unshift(channel);
        return [...prev];
      });
    };

    // Set New Message to Channel
    const setLatestChannel = (message: SocketMessageData) => {
      const channelId = message.channelId;
      setChannelsData((prev: SocketChannelData[]) => {
        // Set lastMessage
        const channel = prev.find((e) => e.id === channelId);
        if (channel) {
          channel.lastMessage = message.body;
          channel.lastMessageDate = message.createdAt;
          channel.read = message.read;
        }
        // Sort By lastMessageDate
        prev.sort((a, b) => {
          if (a.lastMessageDate < b.lastMessageDate) return 1;
          else if (a.lastMessageDate > b.lastMessageDate) return -1;
          else return 0;
        });

        return [...prev];
      });
    };

    // Emit
    socket.emit("getChannelsReq", { userId: user.id });
    if (initToUserId)
      socket.emit("createChannelReq", { toUserId: initToUserId });

    // Listen
    socket.on("createChannelRes", setSelectedChannelId);
    socket.on("getChannelsRes", setChannelsData);
    socket.on("getChannelRes", addNewChannel);
    socket.on("sendMessageRes", setLatestChannel);

    return () => {
      socket.off("createChannelRes", setSelectedChannelId);
      socket.off("getChannelsRes", setChannelsData);
      socket.off("getChannelRes", addNewChannel);
      socket.off("sendMessageRes", setLatestChannel);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket || !selectedChannelId) return;

    let isEmpty = true;

    // Event
    const setMessages = (messages: SocketMessageData[]) => {
      if (messages.length > 0) isEmpty = false;

      setMessagesData(messages);
    };

    const addNewMessage = (message: SocketMessageData) => {
      if (message.channelId === selectedChannelId) {
        console.log("addNewMessage");
        isEmpty = false;
        if (message.sender.id !== user.id) {
          socket.emit("readMessageReq", { channelId: selectedChannelId });
        }
        setMessagesData((prev) => prev.concat(message));
      }
    };

    const readMessage = (channelId: number) => {
      if (channelId === selectedChannelId) {
        setMessagesData((prev) => {
          prev.map((message: SocketMessageData) => {
            if (message.sender.id === user.id) message.read = true;
          });
          return [...prev];
        });
      }
    };

    // Emit
    socket.emit("getMessagesReq", { channelId: selectedChannelId });
    socket.emit("readMessageReq", { channelId: selectedChannelId });

    // Listen
    socket.on("getMessagesRes", setMessages);
    socket.on("sendMessageRes", addNewMessage);
    socket.on("readMessageRes", readMessage);

    return () => {
      socket.off("getMessagesRes", setMessages);
      socket.off("sendMessageRes", addNewMessage);
      socket.off("readMessageRes", readMessage);

      // Delete Empty Channel
      if (selectedChannelId && isEmpty)
        socket.emit("deleteChannelReq", { channelId: selectedChannelId });
    };
  }, [socket, selectedChannelId]);

  return {
    socket,
    user,
    selectedChannelId,
    setSelectedChannelId,
    channelsData,
    messagesData,
  };
};

export default useChat;
