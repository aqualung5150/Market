import { ChatRoomProps, SocketMessageData } from "types/chat";
import useChatRoom from "../hooks/useChatRoom";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useState } from "react";

const ChatRoom = ({ selectedChannelId }: ChatRoomProps) => {
  const {
    activated,
    roomUsers,
    messagesData,
    loader,
    messageInput,
    handleSubmit,
  } = useChatRoom(selectedChannelId);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full w-full flex-1 flex-col"
    >
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2">
        {roomUsers.map((user, idx) => (
          <div
            key={user.id}
            className="flex items-center gap-1 rounded bg-white p-2"
          >
            <img
              className="aspect-square h-12 w-12 rounded-full object-cover"
              src={`${process.env.REACT_APP_API_URL}/users/profileImage/${user.image}`}
            />
            <span className="font-bold">{user.nickname}</span>
            <span className="text-gray-500">#{user.id}</span>
          </div>
        ))}
      </div>
      <div
        style={{ overflowAnchor: "none" }}
        className="sticky flex flex-1 flex-col-reverse gap-2 overflow-auto bg-stone-200 px-3 py-2 shadow-inner"
      >
        {messagesData.map((messageData: SocketMessageData) => (
          <Message key={messageData.id} {...messageData} />
        ))}
        <div ref={loader} />
      </div>
      <MessageInput disabled={!activated} {...messageInput} />
    </form>
  );
};

export default ChatRoom;
