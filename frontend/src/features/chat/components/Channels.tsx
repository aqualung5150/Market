import { ChannelsProps } from "../../../@types/chat";

const Channels = ({ children }: ChannelsProps) => {
  return <ul className="channels">{children}</ul>;
};

export default Channels;
