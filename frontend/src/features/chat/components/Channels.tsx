import { ChannelsProps, SocketChannelData } from "types/chat";
import Channel from "./Channel";
import useChannels from "../hooks/useChannels";

const Channels = ({
  selectedChannelId,
  setSelectedChannelId,
}: ChannelsProps) => {
  const channelsData = useChannels(selectedChannelId, setSelectedChannelId);

  return (
    <div className="flex h-full w-full select-none flex-col border-r">
      {channelsData.length > 0 ? (
        <div className="flex-1 overflow-auto">
          {channelsData.map((channelData: SocketChannelData) => (
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
      ) : (
        <div className="text-md m-auto whitespace-pre-wrap text-center">
          <span>{"대화중인 방이 없습니다.\n관심있는 상품에서 "}</span>
          <span className="text-green-500">채팅하기</span>
          <span>를 눌러보세요.</span>
        </div>
      )}
    </div>
  );
};

export default Channels;
