import React from "react";
import myImg from "../../../assets/default_thumbnail.png";
import { useDispatch } from "react-redux";
import { setOpenChat } from "../chatSlice";

const ChatHeader = () => {
  const dispatch = useDispatch();
  return (
    <div className="py-2 px-3 bg-gray-200 flex flex-row justify-between items-center border">
      <div>
        <img
          className="min-w-10 w-10 h-10 rounded-full object-cover"
          src={myImg}
        />
      </div>
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
