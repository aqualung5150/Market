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

  return userId === sender.id ? (
    <div className="flex mb-2">
      <div className="rounded py-2 px-3 bg-stone-50 max-w-full">
        <p className="text-sm font-bold">{sender.nickname}</p>
        <p className="text-sm mt-1">{body}</p>
        <p className="text-right text-gray-500 text-xs ml-1">{time}</p>
      </div>
    </div>
  ) : (
    <div className="flex justify-end mb-2">
      <div className="rounded py-2 px-3 bg-amber-100">
        <p className="text-sm font-bold">{sender.nickname}</p>
        <p className="text-sm mt-1">{body}</p>
        <p className="text-right text-gray-500 text-xs ml-1">{time}</p>
      </div>
    </div>
  );
};
export default Message;
