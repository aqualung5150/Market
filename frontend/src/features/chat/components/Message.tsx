import React from "react";
import { MessageProps } from "../../../@types/chat";
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

  console.log("Message: " + id + " re-render");

  return userId === sender.id ? (
    <div className="flex justify-end mb-2">
      <div className="flex flex-col justify-end">
        <p className=" text-gray-500 text-xs mr-1 mb-1">
          {read ? "읽음" : "전송"}
        </p>
      </div>
      <div className="rounded py-2 px-3 bg-amber-100 max-w-full">
        <p className="text-sm font-bold">{sender.nickname}</p>
        <p className="break-words text-sm mt-1">{body}</p>
        <p className="text-right text-gray-500 text-xs ml-1">{time}</p>
      </div>
    </div>
  ) : (
    <div className="flex mb-2">
      <div className="rounded py-2 px-3 bg-stone-50 max-w-full">
        <p className="text-sm font-bold">{sender.nickname}</p>
        <p className="break-words text-sm mt-1">{body}</p>
        <p className="text-right text-gray-500 text-xs ml-1">{time}</p>
      </div>
    </div>
  );
};
// export default Message;
export default React.memo(Message);
