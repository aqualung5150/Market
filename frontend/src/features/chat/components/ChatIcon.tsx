import React from "react";
import icon from "../../../assets/chatIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { setNoti, setOpenChat } from "../chatSlice";
import { RootState } from "../../../app/store";
import { setOpenLogin } from "../../auth/loginSlice";
import { useLocation } from "react-router-dom";

const ChatIcon = () => {
  const { pathname } = useLocation();
  const userId = useSelector((state: RootState) => state.user.id);
  const noti = useSelector((state: RootState) => state.chat.noti);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!userId) {
      sessionStorage.setItem("redirect", pathname);
      dispatch(setOpenLogin(true));
    } else {
      dispatch(setOpenChat(true));
      dispatch(setNoti(false));
    }
  };

  return (
    <div
      onClick={handleClick}
      className="hidden lg:block rounded-full bg-blue-300 shadow-lg fixed bottom-[5%] right-[5%] hover:bg-blue-400 cursor-pointer"
    >
      <img className="h-[70px] p-3" src={icon} />
      {noti && (
        <p className="rounded-full w-6 h-6 bg-red-500 border-2 border-white border-opacity-100 fixed bottom-28 right-16" />
      )}
    </div>
  );
};

export default React.memo(ChatIcon);
