import { ChannelsProps } from "../../../@types/chat";
import Channel from "./Channel";

const Channels = ({ channels, setSelectedChannelId }: ChannelsProps) => {
  return (
    <ul className="channels">
      {channels.map((channel) => (
        <Channel {...channel} setSelectedChannelId={setSelectedChannelId} />
      ))}
    </ul>
  );
};

export default Channels;
