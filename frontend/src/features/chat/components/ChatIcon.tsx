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
      className="fixed bottom-[5%] right-[5%] hidden cursor-pointer rounded-full bg-blue-300 shadow-lg hover:bg-blue-400 lg:block"
    >
      <img className="h-[70px] p-3" src={icon} />
      {noti && (
        <p className="fixed bottom-28 right-16 h-6 w-6 rounded-full border-2 border-white border-opacity-100 bg-red-500" />
      )}
    </div>
  );
};

export default React.memo(ChatIcon);
