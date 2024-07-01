import { useContext, useEffect, useState } from "react";
import {
  SocketChannelData,
  SocketMessageData,
  UseChannelsProps,
} from "../../../types/chat";
import { SocketContext } from "../../../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { setSendTo } from "../chatSlice";

const useChannels = ({
  selectedChannelId,
  setSelectedChannelId,
}: UseChannelsProps) => {
  const socket = useContext(SocketContext).socket;
  const userId = useSelector((state: RootState) => state.user.id);
  const [channelsData, setChannelsData] = useState<SocketChannelData[]>([]);
  const sendTo = useSelector((state: RootState) => state.chat.sendTo);
  const dispatch = useDispatch();

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

          if (selectedChannelId === channelId) channel.read = true;
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

  // Check if channel with 'sendTo' user is already exist
  useEffect(() => {
    if (!sendTo && channelsData.length < 1) return;
    const sendToChannel = channelsData.find((channel) =>
      channel.users.find((user) => user.id === sendTo)
    );
    if (sendToChannel) {
      dispatch(setSendTo(0));
      setSelectedChannelId(sendToChannel.id);
    }
  }, [channelsData]);

  return { userId, channelsData };
};

export default useChannels;
