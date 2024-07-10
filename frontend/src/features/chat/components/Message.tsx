import { RootState } from "app/store";
import React from "react";
import { useSelector } from "react-redux";
import { SocketMessageData } from "types/chat";
import dateAgo from "utils/dateAgo";

const Message = ({
  id,
  body,
  read,
  createdAt,
  channelId,
  sender,
}: SocketMessageData) => {
  const userId = useSelector((state: RootState) => state.user.id);
  const timestamp = new Date(createdAt);
  const date = dateAgo(timestamp);
  let time = new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "numeric",
  }).format(timestamp);
  if (date) time = `${date} ${time}`;

  return userId === sender.id ? (
    <div className="flex justify-end">
      <div className="m-1 self-end text-nowrap text-xs text-gray-500">
        {read ? "읽음" : "전송"}
      </div>
      <div className="flex max-w-[90%] flex-col gap-2 rounded bg-amber-100 px-3 py-2">
        <p className="text-sm font-semibold italic">{sender.nickname}</p>
        <p className="break-words text-sm">{body}</p>
        <p className="self-end text-xs text-gray-500">{time}</p>
      </div>
    </div>
  ) : (
    <div className="flex">
      <div className="flex max-w-[90%] flex-col gap-2 rounded bg-stone-50 px-3 py-2">
        <p className="text-sm font-semibold italic">{sender.nickname}</p>
        <p className="break-words text-sm">{body}</p>
        <p className="self-end text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
};

export default React.memo(Message);
