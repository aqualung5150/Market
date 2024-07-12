import React from "react";
import icon from "assets/chatIcon.png";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { setOpenLogin } from "features/auth/loginSlice";
import { setNoti, setOpenChat } from "../chatSlice";

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
        <div>
          <p className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
            <p className="h-full w-full animate-ping rounded-full bg-red-500" />
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(ChatIcon);
