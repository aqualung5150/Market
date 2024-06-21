import React from "react";
import myImg from "../../../assets/default_thumbnail.png";
import { useDispatch } from "react-redux";
import { setOpenChat } from "../chatSlice";
import { ChatHeaderProps } from "../../../@types/chat";

const ChatHeader = ({ nickname }: ChatHeaderProps) => {
  const dispatch = useDispatch();
  return (
    <div className="py-2 px-3 bg-gray-200 flex flex-row items-center border">
      <div>
        <img
          className="min-w-10 w-10 h-10 rounded-full object-cover"
          src={myImg}
        />
      </div>
      <span className="ml-3 text-xl font-medium truncate flex-1">
        {nickname}
      </span>
      <div
        onClick={() => {
          dispatch(setOpenChat(false));
        }}
        className="text-xl select-none"
      >
        X
      </div>
    </div>
  );
};

export default React.memo(ChatHeader);
