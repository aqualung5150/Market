import { ChannelsProps, SocketChannelData } from "../../../@types/chat";
import Channel from "./Channel";
import useChannels from "../hooks/useChannels";

const Channels = ({
  selectedChannelId,
  setSelectedChannelId,
}: ChannelsProps) => {
  const { userId, channelsData } = useChannels({ selectedChannelId });

  return (
    <div className="w-1/3 max-w-[420px] border-r flex flex-col select-none">
      <div className="flex-1 overflow-auto">
        {channelsData?.map((channelData: SocketChannelData) => {
          return (
            <div
              key={channelData.id}
              className={
                "border-b bg-white px-3 flex items-center cursor-pointer " +
                (selectedChannelId === channelData.id
                  ? " bg-gray-300"
                  : " hover:bg-gray-100")
              }
              onClick={() => {
                setSelectedChannelId(channelData.id);
                channelData.read = true;
              }}
            >
              <Channel {...channelData} userId={userId} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Channels;
