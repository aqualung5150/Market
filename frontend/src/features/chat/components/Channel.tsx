import React from "react";
import { ChannelProps } from "../../../@types/chat";

const Channel = ({
  id,
  users,
  lastMessage,
  setSelectedChannelId,
}: ChannelProps) => {
  //   console.log("rerender: ", name);
  return (
    <li
      className="channel"
      onClick={() => {
        setSelectedChannelId(id);
      }}
    >
      <div className="title">
        <h1>{users.join(", ")}</h1>
        <h2>{lastMessage.createdAt}</h2>
      </div>
      <div className="message">{lastMessage.body}</div>
    </li>
  );
};

// const Channel = ({ id, name, setSelectedChannelId }: ChannelProps) => {
//     console.log("rerender: ", name);
//     return (
//       <li
//         onClick={() => {
//           setSelectedChannelId(id);
//         }}
//       >
//         <h1>{name}</h1>
//       </li>
//     );
//   };

export default React.memo(Channel);
