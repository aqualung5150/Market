import { SocketChannelData } from "../../../@types/chat";

const updateChannels = ({ message, setChannelsData }: any) => {
  console.log("here!!");
  const channelId = message.channelId;
  setChannelsData((prev: SocketChannelData[]) => {
    // Assign New Message to Channel
    const channel = prev.find((e) => e.id === channelId);
    if (channel) {
      channel.lastMessage = message.body;
      channel.lastMessageDate = message.createdAt;
      channel.read = message.read;
    }

    // Sort Channel List By 'lastMessageDate'
    prev.sort((a, b) => {
      if (a.lastMessageDate < b.lastMessageDate) return 1;
      else if (a.lastMessageDate > b.lastMessageDate) return -1;
      else return 0;
    });

    // 자바스크립트는 Array가 객체야...state의 주소값을 바꿔주자...
    return [...prev];
  });
};

export default updateChannels;
