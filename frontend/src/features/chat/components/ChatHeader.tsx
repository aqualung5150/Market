import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenChat, setSendTo } from "../chatSlice";
import { RootState } from "app/store";
import { ReactComponent as CloseIcon } from "assets/close.svg";
import { ReactComponent as BackIcon } from "assets/back.svg";

const ChatHeader = ({ selectedChannelId, setSelectedChannelId }: any) => {
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const image = useSelector((state: RootState) => state.user.image);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-row items-center border bg-gray-200 px-3 py-2">
      <div>
        <img
          className="h-10 w-10 min-w-10 rounded-full object-cover"
          src={`${process.env.REACT_APP_API_URL}/users/profileImage/${image}`}
        />
      </div>
      <span className="ml-3 flex-1 truncate text-xl font-medium">
        {nickname}
      </span>
      <BackIcon
        onClick={() => {
          setSelectedChannelId(0);
        }}
        className={`${selectedChannelId ? "" : "hidden"} h-10 w-10 lg:hidden`}
      />
      <CloseIcon
        onClick={() => {
          dispatch(setOpenChat(false));
          dispatch(setSendTo(0));
        }}
        className={`${selectedChannelId ? "hidden" : ""} h-10 w-10 stroke-black lg:hidden`}
      />
    </div>
  );
};

export default React.memo(ChatHeader);
