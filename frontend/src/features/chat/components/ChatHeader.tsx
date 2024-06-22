import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenChat } from "../chatSlice";
import { RootState } from "../../../app/store";

const ChatHeader = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="py-2 px-3 bg-gray-200 flex flex-row items-center border">
      <div>
        <img
          className="min-w-10 w-10 h-10 rounded-full object-cover"
          src={`${process.env.REACT_APP_API_URL}/users/profileImage/${user.image}`}
        />
      </div>
      <span className="ml-3 text-xl font-medium truncate flex-1">
        {user.nickname}
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
