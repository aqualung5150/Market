import { ChannelsProps, SocketChannelData } from "../../../types/chat";
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
    <div className="w-full h-full border-r flex flex-col select-none">
      <div className="flex-1 overflow-auto">
        {channelsData?.map((channelData: SocketChannelData) => (
          <div
            key={channelData.id}
            className={
              "border-b bg-white px-3 flex items-center cursor-pointer " +
              (selectedChannelId === channelData.id
                ? " bg-blue-100"
                : " hover:bg-gray-100")
            }
            onClick={() => {
              setSelectedChannelId(channelData.id);
              channelData.read = true;
            }}
          >
            <Channel data={channelData} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channels;
