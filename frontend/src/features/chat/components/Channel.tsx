import { ChannelProps } from "../../../@types/chat";
import timeAgo from "../../../utils/timeAgo";
import profileImg from "../../../assets/ym41716351689954-640-0.jpg";
import React from "react";

const Channel = ({
  id,
  lastMessage,
  lastMessageDate,
  read,
  senderId,
  users,
  userId,
}: ChannelProps) => {
  console.log(
    "CHANNEL: " +
      id +
      " SENDER: " +
      senderId +
      " USER: " +
      userId +
      " READ: " +
      read
  );

  const timestamp = new Date(lastMessageDate);
  const time = timeAgo(timestamp);

  return (
    <>
      <div className="relative">
        {senderId !== userId && !read && (
          <p className="absolute left-[35px] bg-rose-600 w-[13px] h-[13px] rounded-full" />
        )}
        <img
          className="h-12 w-12 min-w-12 rounded-full object-cover"
          src={profileImg}
        />
      </div>
      <div className="ml-4 flex-1 py-4 truncate">
        <div className="flex items-bottom justify-between">
          <div className="font-medium truncate">
            {userId !== users[0].id ? users[0].nickname : users[1].nickname}
            {/* {users[0].nickname + ", " + users[1].nickname} */}
          </div>
          <span className="text-xs text-grey-darkest">{time}</span>
        </div>
        <div className="text-grey-dark mt-1 text-sm truncate">
          <span>{lastMessage}</span>
        </div>
      </div>
    </>
  );
};

export default React.memo(Channel);
