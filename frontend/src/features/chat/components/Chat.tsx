import { useContext, useEffect, useState } from "react";
import Channel from "./Channel";
import { SocketContext } from "../../../context/SocketContext";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  ChatProps,
  SocketChannelData,
  SocketMessageData,
} from "../../../@types/chat";
import Message from "./Message";
import Channels from "./Channels";
import ChatRoom from "./ChatRoom";

const Chat = ({ initToUserId = 0 }: ChatProps) => {
  const [selectedChannelId, setSelectedChannelId] = useState(0);
  // const [socket, setSocket] = useState<Socket | null>(null);
  const socket = useContext(SocketContext).socket;
  const [channelsData, setChannelsData] = useState<SocketChannelData[]>([]);
  const [messagesData, setMessagesData] = useState<SocketMessageData[]>([]);

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!socket) return;

    // Create New Channel
    if (initToUserId) {
      console.log("initToUserId", initToUserId);
      socket.emit("createChannelReq", { toUserId: initToUserId });
    }
    socket.on("createChannelRes", ({ channelId }) => {
      setSelectedChannelId(channelId);
    });

    // Channel List
    socket.on("getChannelsRes", ({ channels }) => {
      console.log("getChannelsRes");
      setChannelsData(channels);
    });

    // Get New Channel
    socket.on("getChannelRes", ({ channel }) => {
      setChannelsData((prev) => {
        prev.unshift(channel);
        return [...prev];
      });
    });

    // Message List
    // socket.on("getMessagesRes", ({ messages }) => {
    //   console.log("getMessagesRes");
    //   setMessagesData(messages);
    // });

    // Request Channel List
    socket.emit("getChannelsReq", { userId: user.id });

    return () => {
      socket.off("createChannelRes");
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    let isEmpty = true;
    socket.on("getMessagesRes", ({ messages }) => {
      console.log("getMessagesRes");
      setMessagesData(messages);

      //test
      if (messages.length > 0) isEmpty = false;
    });

    socket.on("sendMessageRes", ({ message }) => {
      //test
      isEmpty = false;
      // Channel
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
          if (a.lastMessageDate < b.lastMessageDate) return 1;
          else if (a.lastMessageDate > b.lastMessageDate) return -1;
          else return 0;
        });

        // 자바스크립트는 Array가 객체야...state의 주소값을 바꿔주자...
        return [...prev];
      });

      //Message
      if (message.channelId === selectedChannelId)
        setMessagesData((prev) => prev.concat(message));
    });

    socket?.emit("getMessagesReq", { channelId: selectedChannelId });

    return () => {
      socket.off("sendMessageRes");

      // todo - fix: messagesData.length => 아직 메세지를 받지 않은 상태의 길이를 담고있음
      // Chat 언마운트 될 때 그냥 clearEmptyChannels를 보낼까
      // if (selectedChannelId && messagesData.length === 0)
      //   socket.emit("deleteChannelReq", { channelId: selectedChannelId });
      // => => => 해치웠나
      if (selectedChannelId && isEmpty)
        socket.emit("deleteChannelReq", { channelId: selectedChannelId });

      console.log(selectedChannelId, isEmpty);
    };
  }, [socket, selectedChannelId]);

  return (
    <div className="container">
      <div className="channels">
        <Channels>
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
        </Channels>
      </div>
      <div className="body">
        {selectedChannelId ? (
          <div>
            <h1>Selected Channel is {selectedChannelId}</h1>
            <ChatRoom selectedChannelId={selectedChannelId}>
              {messagesData?.map((messageData: SocketMessageData) => (
                <Message
                  key={messageData.id}
                  {...messageData}
                  userId={user.id}
                />
              ))}
            </ChatRoom>
          </div>
        ) : (
          <div>no room</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
