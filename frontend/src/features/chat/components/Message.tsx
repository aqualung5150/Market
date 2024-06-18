import { useEffect } from "react";
import { MessageProps } from "../../../@types/chat";
import timeAgo from "../../../utils/timeAgo";
import dateAgo from "../../../utils/dateAgo";

const Message = ({
  id,
  body,
  read,
  createdAt,
  channelId,
  sender,
  userId,
}: MessageProps) => {
  const timestamp = new Date(createdAt);
  const date = dateAgo(timestamp);
  let time = new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "numeric",
  }).format(timestamp);
  if (date) time = `${date} ${time}`;

  return (
    <li>
      <h2>{body}</h2>
      {userId === sender.id ? <h3>me</h3> : <h3>{sender.nickname}</h3>}
      <h3>{time}</h3>
    </li>
  );
};

export default Message;
