import { useEffect, useState } from "react";
import {
  SocketChannelData,
  SocketMessageData,
  useChannelsProps,
} from "../../../@types/chat";

const useChannels = ({
  socket,
  userId,
  selectedChannelId,
}: useChannelsProps) => {
  const [channelsData, setChannelsData] = useState<SocketChannelData[]>([]);

  useEffect(() => {
    if (!socket) return;
    // Event
    const addNewChannel = (channel: SocketChannelData) => {
      setChannelsData((prev) => {
        prev.unshift(channel);
        return [...prev];
      });
    };

    // Listen
    socket.on("getChannelsRes", setChannelsData);
    socket.on("getChannelRes", addNewChannel);
    // Emit
    socket.emit("getChannelsReq", { userId: userId });

    return () => {
      socket.off("getChannelsRes", setChannelsData);
      socket.off("getChannelRes", addNewChannel);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    // Event
    const setLatestChannel = (message: SocketMessageData) => {
      const channelId = message.channelId;
      setChannelsData((prev: SocketChannelData[]) => {
        // Set lastMessage
        const channel = prev.find((e) => e.id === channelId);
        if (channel) {
          channel.lastMessage = message.body;
          channel.lastMessageDate = message.createdAt;
          channel.senderId = message.sender.id;
          if (channel.senderId !== userId && selectedChannelId === channelId)
            channel.read = true;
          else channel.read = message.read;
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

    socket.on("sendMessageRes", setLatestChannel);

    return () => {
      socket.off("sendMessageRes", setLatestChannel);
    };
  }, [socket, selectedChannelId]);

  return { channelsData };
};

export default useChannels;
