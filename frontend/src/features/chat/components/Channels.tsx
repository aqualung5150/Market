import { useEffect, useState } from "react";
import {
  ChannelsProps,
  SocketChannelData,
  SocketMessageData,
} from "../../../@types/chat";
import Channel from "./Channel";
import userEvent from "@testing-library/user-event";

const Channels = ({ socket, userId, setSelectedChannelId }: ChannelsProps) => {
  const [channelsData, setChannelsData] = useState<SocketChannelData[]>([]);

  useEffect(() => {
    if (!socket) return;
    socket.on("getChannelsRes", ({ channels }) => {
      setChannelsData(channels);
    });

    socket.on("sendMessageRes", ({ message }) => {
      const channelId = message.channelId;
      setChannelsData((prev) => {
        // Assign New Message to Channel
        const channel = prev.find((e) => e.id === channelId);
        if (channel) {
          channel.lastMessage = message.body;
          channel.lastMessageDate = message.createdAt;
          channel.read = message.read;
        }

        // Sort Channel List By 'lastMessageDate'
        prev.sort((a, b) => {
          if (a.lastMessageDate > b.lastMessageDate) return -1;
          return 0;
        });

        // 자바스크립트는 Array가 객체야...state의 주소값을 바꿔주자...
        return [...prev];
      });
    });

    // Create New Channel
    // socket.on("createChannelRes", ({ channel, channelId }) => {
    //   setChannelsData((prev) => {
    //     prev.unshift(channel);
    //     return [...prev];
    //   });
    //   setSelectedChannelId(channelId);
    // });

    // Get New Channel
    socket.on("getChannelRes", ({ channel }) => {
      setChannelsData((prev) => {
        prev.unshift(channel);
        return [...prev];
      });
    });

    // Request Channel List
    socket.emit("getChannelsReq", { userId });

    return () => {
      socket.off("getChannelsRes");
      socket.off("sendMessageRes");
      socket.off("getChannelRes");
    };
  }, [socket]);

  return (
    <ul className="channels">
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
    </ul>
  );
};

export default Channels;
