import { ChannelsProps, SocketChannelData } from "../../../@types/chat";
import Channel from "./Channel";
import useChannels from "../hooks/useChannels";

const Channels = ({
  socket,
  userId,
  selectedChannelId,
  setSelectedChannelId,
}: ChannelsProps) => {
  const { channelsData } = useChannels({ socket, userId, selectedChannelId });

  return (
    <div className="w-1/3 max-w-[420px] border flex flex-col select-none">
      <div className="flex-1 overflow-auto">
        {channelsData?.map((channelData: SocketChannelData) => (
          <div
            className={`border-b border-grey-lighter bg-white px-3 flex items-center cursor-pointer ${
              selectedChannelId === channelData.id
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
            onClick={() => {
              setSelectedChannelId(channelData.id);
              channelData.read = true;
            }}
          >
            <Channel key={channelData.id} {...channelData} userId={userId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channels;
