import { ChannelProps, SocketChannelData } from "../../../@types/chat";
import timeAgo from "../../../utils/timeAgo";
import styles from "./Channel.module.css";
import profileImg from "../../../assets/ym41716351689954-640-0.jpg";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Channel = ({
  id,
  lastMessage,
  lastMessageDate,
  read,
  senderId,
  users,
  userId,
}: // selectedChannelId,
// setSelectedChannelId,
ChannelProps) => {
  // const [noti, setNoti] = useState(!read);

  if (!lastMessage) return null;

  const timestamp = new Date(lastMessageDate);
  const time = timeAgo(timestamp);

  return (
    // <div
    //   className={`border-b border-grey-lighter bg-white px-3 flex items-center cursor-pointer ${
    //     selectedChannelId === id ? "bg-gray-200" : "hover:bg-gray-100"
    //   }`}
    //   onClick={() => {
    //     setSelectedChannelId(id);
    //     setNoti(false);
    //   }}
    // >
    <>
      <div>
        {senderId !== userId && !read && (
          <p className="absolute left-[50px] bg-red-600 w-[13px] h-[13px] rounded-full" />
        )}
        <img
          className="h-12 w-12 min-w-12 rounded-full object-cover"
          src={profileImg}
        />
      </div>
      <div className="ml-4 flex-1 py-4 truncate">
        <div className="flex items-bottom justify-between">
          <div className="text-grey-darkest truncate">
            {users[0].nickname + ", " + users[1].nickname}
          </div>
          <span className="text-xs text-grey-darkest">{time}</span>
        </div>
        <div className="text-grey-dark mt-1 text-sm truncate">
          <span>{lastMessage}</span>
        </div>
      </div>
    </>
    // </div>
  );
};

export default Channel;
// export default React.memo(Channel);
