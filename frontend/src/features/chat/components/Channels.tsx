import { ChannelsProps, SocketChannelData } from "types/chat";
import Channel from "./Channel";
import useChannels from "../hooks/useChannels";

const Channels = ({
  selectedChannelId,
  setSelectedChannelId,
}: ChannelsProps) => {
  const channelsData = useChannels({
    selectedChannelId,
    setSelectedChannelId,
  });

  return (
    <div className="flex h-full w-full select-none flex-col border-r">
      <div className="flex-1 overflow-auto">
        {channelsData?.map((channelData: SocketChannelData) => (
          <div
            key={channelData.id}
            className={
              "flex cursor-pointer items-center border-b bg-white px-3 " +
              (selectedChannelId === channelData.id
                ? " bg-blue-100"
                : " hover:bg-gray-100")
            }
            onClick={() => {
              setSelectedChannelId(channelData.id);
              channelData.read = true;
            }}
          >
            <Channel {...channelData} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channels;
