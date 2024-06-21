import React from "react";
import icon from "../../../assets/free-icon-message-8316231.png";
import { useDispatch, useSelector } from "react-redux";
import { setNoti, setOpenChat, setSendTo } from "../chatSlice";
import { RootState } from "../../../app/store";

const ChatIcon = () => {
  const openChat = useSelector((state: RootState) => state.chat.open);
  const noti = useSelector((state: RootState) => state.chat.noti);
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(setOpenChat(!openChat));
        dispatch(setNoti(false));
      }}
      className=" rounded-full bg-blue-300 fixed bottom-16 right-16 hover:bg-blue-400 cursor-pointer"
    >
      <img className="h-[70px] p-3" src={icon} />
      {noti && (
        <p className="rounded-full w-6 h-6 bg-red-500 fixed bottom-28 right-16" />
      )}
    </div>
  );
};

export default React.memo(ChatIcon);
