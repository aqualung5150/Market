import React from "react";
import { SocketMessageData } from "../../../types/chat";
import dateAgo from "../../../utils/dateAgo";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

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
    <div className="mb-2 flex justify-end">
      <div className="flex flex-col justify-end">
        <p className="mb-1 mr-1 text-xs text-gray-500">
          {read ? "읽음" : "전송"}
        </p>
      </div>
      <div className="max-w-full rounded bg-amber-100 px-3 py-2">
        <p className="text-sm font-semibold">{sender.nickname}</p>
        <p className="mt-1 break-words text-sm">{body}</p>
        <p className="ml-1 text-right text-xs text-gray-400">{time}</p>
      </div>
    </div>
  ) : (
    <div className="mb-2 flex">
      <div className="max-w-full rounded bg-stone-50 px-3 py-2">
        <p className="text-sm font-semibold">{sender.nickname}</p>
        <p className="mt-1 break-words text-sm">{body}</p>
        <p className="ml-1 text-right text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
};

export default React.memo(Message);
