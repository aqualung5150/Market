import React from "react";
import { ChannelProps } from "../../../@types/chat";

const Channel = ({
  id,
  lastMessage,
  lastMessageDate,
  read,
  users,
  setSelectedChannelId,
}: ChannelProps) => {
  return (
    <li
      className="channel"
      onClick={() => {
        setSelectedChannelId(id);
      }}
    >
      <div className="title">
        <h1>{users[0].nickname + ", " + users[1].nickname}</h1>
        <h2>{lastMessageDate}</h2>
      </div>
      <div className="message">{lastMessage}</div>
    </li>
  );
};

export default React.memo(Channel);
