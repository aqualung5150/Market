import { useSelector } from "react-redux";
import { ChannelProps } from "../../../types/chat";
import { PublicUser } from "../../../types/user";
import timeAgo from "../../../utils/timeAgo";
import React from "react";
import { RootState } from "../../../app/store";

const Channel = ({ data }: ChannelProps) => {
  const userId = useSelector((state: RootState) => state.user.id);

  let me: PublicUser;
  for (const user of data.users) {
    if (user.id === userId) {
      me = user;
      break;
    }
  }
  const timestamp = new Date(data.lastMessageDate);
  const time = timeAgo(timestamp);

  return (
    <>
      <div className="relative">
        {data.senderId !== userId && !data.read && (
          <p className="absolute left-[35px] h-[15px] w-[15px] rounded-full border-2 border-white border-opacity-100 bg-rose-600" />
        )}
        <img
          className="h-12 w-12 min-w-12 rounded-full object-cover"
          src={`${process.env.REACT_APP_API_URL}/users/profileImage/${
            userId !== data.users[0].id
              ? data.users[0].image
              : data.users[1].image
          }`}
        />
      </div>
      <div className="ml-4 flex-1 truncate py-4">
        <div className="items-bottom flex justify-between">
          <div className="truncate font-medium">
            {userId !== data.users[0].id
              ? data.users[0].nickname
              : data.users[1].nickname}
          </div>
          <span className="text-grey-darkest text-xs">{time}</span>
        </div>
        <div className="text-grey-dark mt-1 truncate text-sm">
          <span>{data.lastMessage}</span>
        </div>
      </div>
    </>
  );
};

export default React.memo(Channel);
