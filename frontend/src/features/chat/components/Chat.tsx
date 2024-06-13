import { useEffect, useState } from "react";
import Channel from "./Channel";
import useChatSocket from "../hooks/useChatSocket";
import { SocketContext } from "../../../context/SocketContext";
import { Socket, io } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import InputField from "./InputField";
import { ChannelInfo, MessageInfo } from "../../../@types/chat";

//개꿀팁 - 컴포넌트 props 넘겨줄때 스프레드연산자 되는듯
// https://velog.io/@ayaan92/JSX-Spread-Operator

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

    //listen
    connection.on("getChannelsRes", (payload) => {
      setChannels(payload);
      /* Channel {
            id: Conversation,id
            users: User.nickname[],
            lastMessage: Message (where conversationId 조건 첫번째createdAt)
        }

        channels: Channel[]
      */
    });

    // connection.on("getChannelRes", (payload) => {
    //   console.log("getChannelsRes");
    // });

    connection.on("getMessagesRes", (payload) => {
      console.log("getMessagesRes");
    });

    connection.on("newChannel", (payload) => {
      setChannels((prev) => prev.concat(payload));
    });

    // emit
    connection.emit("getChannelsReq");

    setSocket(connection);
  }, []);

  //   const socket = useChatSocket();

  // 스프레드 연산자 되네
  const lastMessage: MessageInfo = {
    id: 42,
    sender: "승준",
    body: "this is last message",
    read: false,
    createdAt: 20240613,
  };

  const channelProps = {
    id: 1,
    users: ["first", "second", "last"],
    lastMessage: lastMessage,
  };

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
          <ul>
            <Channel
              {...channelProps}
              setSelectedChannelId={setSelectedChannelId}
            />
            <Channel
              id={2}
              users={["첫째", "둘째", "셋째"]}
              lastMessage={lastMessage}
              setSelectedChannelId={setSelectedChannelId}
            />
          </ul>
        </div>
        <div className="body">
          {selectedChannelId ? (
            <div>
              <h1>Selected Channel is {selectedChannelId}</h1>
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
