import { useEffect, useState } from "react";
import Channel from "./Channel";
import useChatSocket from "../hooks/useChatSocket";
import { SocketContext } from "../../../context/SocketContext";
import { Socket, io } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import InputField from "./InputField";
import { ChannelInfo, MessageInfo } from "../../../@types/chat";
import Message from "./Message";

const Chat = () => {
  const [selectedChannelId, setSelectedChannelId] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [channels, setChannels] = useState<ChannelInfo[]>([]);
  const [messages, setMessages] = useState<MessageInfo[]>([]);

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const connection = io(`${process.env.REACT_APP_BASE_URL}/chat`, {
      query: { nickname: user.nickname },
      transports: ["websocket"],
    });

    // on
    // 채널 리스트
    connection.on("getChannelsRes", (payload) => {
      setChannels(payload.channels);
    });

    // 채널 (내가 포함된 새로운 채널이 개설되고 상대로부터 메세지가 왔을때)
    connection.on("newChannelRes", (payload) => {
      setChannels((prev) => prev.concat(payload.channel));
    });
    // 채널의 메세지 리스트
    connection.on("getMessagesRes", (payload) => {
      setMessages(payload.messages);
    });

    connection.on("receiveMessage", (payload) => {
      setMessages((prev) => prev.concat(payload.message));
    });

    ////////////////////////////////////////////////
    // emit
    // 채널리스트
    connection.emit("getChannelsReq");

    setSocket(connection);
  }, []);

  useEffect(() => {
    if (selectedChannelId <= 0) return;

    // 선택한 채널의 메세지를 불러옴
    socket?.emit("getMessagesReq", selectedChannelId);
  }, [selectedChannelId]);

  return (
    <SocketContext.Provider value={{ chatSocket: socket }}>
      <div className="container">
        <div className="channels">
          <ul>
            {channels.map((channel) => (
              <Channel
                {...channel}
                setSelectedChannelId={setSelectedChannelId}
              />
            ))}
          </ul>
        </div>
        <div className="body">
          {selectedChannelId ? (
            <div>
              <h1>Selected Channel is {selectedChannelId}</h1>
              <ul>
                {messages.map((message: MessageInfo) => (
                  <Message
                    userId={user.id}
                    id={message.id}
                    sender={message.sender}
                    body={message.body}
                    read={message.read}
                    createdAt={message.createdAt}
                  />
                ))}
              </ul>
              <InputField socket={socket} channelId={selectedChannelId} />
            </div>
          ) : (
            <h1>No Channel Selected</h1>
          )}
        </div>
      </div>
    </SocketContext.Provider>
  );
};

export default Chat;

/*
메시지 박스 리렌더링을 어떻게 막을까
과거 채팅 내역 -> children으로
실시간 채팅 -> 새로운 스테이트로 관리? [newMessages, setNewMessages] = useState()???
*/
