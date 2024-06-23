import { ChannelProps, SocketUserData } from "../../../@types/chat";
import timeAgo from "../../../utils/timeAgo";
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
  let me: SocketUserData;
  for (const user of users) {
    if (user.id === userId) {
      me = user;
      break;
    }
  }
  const timestamp = new Date(lastMessageDate);
  const time = timeAgo(timestamp);

  return (
    <>
      <div className="relative">
        {senderId !== userId && !read && (
          <p className="absolute left-[35px] bg-rose-600 w-[15px] h-[15px] rounded-full border-2 border-white  border-opacity-100" />
        )}
        <img
          className="h-12 w-12 min-w-12 rounded-full object-cover"
          src={`${process.env.REACT_APP_API_URL}/users/profileImage/${
            userId !== users[0].id ? users[0].image : users[1].image
          }`}
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
