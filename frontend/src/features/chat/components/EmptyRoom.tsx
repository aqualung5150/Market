import { useEffect, useState } from "react";
import { SocketMessageData } from "../../../@types/chat";
import InputField from "./InputField";
import Message from "./Message";

const EmptyRoom = ({ socket, userId }: any) => {
  const [messagesData, setMessagesData] = useState<SocketMessageData[]>([]);
  const [created, setCreated] = useState<Boolean>(false);
  //   const [channelId, setChannelId] = useState(0);
  let curChannelId = 0;

  useEffect(() => {
    if (!socket) return;
    socket.on("getMessagesRes", ({ messages }: any) => {
      setMessagesData(messages);
    });

    socket.on("sendMessageRes", ({ message }: any) => {
      if (message.channelId === curChannelId)
        setMessagesData((prev) => prev.concat(message));
    });

    socket.on("createChannelRes", ({ channelId }: any) => {
      curChannelId = channelId;
      socket?.emit("getMessagesReq", { channelId: channelId });
    });
  }, [socket]);

  return (
    <div>
      {curChannelId && <h1>Selected Channel is {curChannelId}</h1>}
      <ul className="messages">
        {messagesData.map((messageData: SocketMessageData) => (
          <Message key={messageData.id} {...messageData} userId={userId} />
        ))}
      </ul>
      {created ? (
        <InputField socket={socket} channelId={curChannelId} type={"send"} />
      ) : (
        <InputField
          socket={socket}
          toUserId={4}
          setCreated={setCreated}
          type={"create"}
        />
      )}
    </div>
  );
};

export default EmptyRoom;
