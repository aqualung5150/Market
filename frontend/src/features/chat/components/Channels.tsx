import { useEffect, useState } from "react";
import { ChannelsProps, SocketChannelData } from "../../../@types/chat";
import Channel from "./Channel";
import userEvent from "@testing-library/user-event";

const Channels = ({ socket, userId, setSelectedChannelId }: ChannelsProps) => {
  const [channelsData, setChannelsData] = useState<SocketChannelData[]>([]);

  useEffect(() => {
    if (!socket) return;
    socket.on("getChannelsRes", ({ channels }) => {
      // 처음에 정렬되어서 옴
      setChannelsData(channels);
      // if (channelsData)
      //   channelsData.sort((a: ChannelData, b: ChannelData) => {
      //     if (a.messages[0].createdAt > b.messages[0].createdAt) return -1;
      //     return 0;
      //   });
    });
    // todo - 새 메세지가 온 채널을 제일 위로 올려줘야됨
    // socket.on("sendMessageRes", () => {});
    // if (socket.connected) {
    //   socket.emit("getChannelsReq", { userId });
    //   console.log("here", channelsData);
    // }
    socket.emit("getChannelsReq", { userId });
  }, [socket]);

  return (
    <ul className="channels">
      {channelsData?.map((channelData: SocketChannelData) => (
        <Channel
          key={channelData.id}
          {...channelData}
          setSelectedChannelId={setSelectedChannelId}
        />
      ))}
    </ul>
  );
};

export default Channels;
