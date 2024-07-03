import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenChat, setSendTo } from "../chatSlice";
import { RootState } from "../../../app/store";
import { ReactComponent as CloseIcon } from "../../../assets/close.svg";
import { ReactComponent as BackIcon } from "../../../assets/back.svg";

const ChatHeader = ({ selectedChannelId, setSelectedChannelId }: any) => {
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const image = useSelector((state: RootState) => state.user.image);
  const dispatch = useDispatch();
  return (
    <div className="py-2 px-3 bg-gray-200 flex flex-row items-center border">
      <div>
        <img
          className="min-w-10 w-10 h-10 rounded-full object-cover"
          src={`${process.env.REACT_APP_API_URL}/users/profileImage/${image}`}
        />
      </div>
      <span className="ml-3 text-xl font-medium truncate flex-1">
        {nickname}
      </span>
      <BackIcon
        onClick={() => {
          setSelectedChannelId(0);
        }}
        className={`${selectedChannelId ? "" : "hidden"} lg:hidden w-10 h-10`}
      />
      <CloseIcon
        onClick={() => {
          dispatch(setOpenChat(false));
          dispatch(setSendTo(0));
        }}
        className={`${selectedChannelId ? "hidden" : ""} lg:inline w-10 h-10`}
      />
    </div>
  );
};

export default React.memo(ChatHeader);
