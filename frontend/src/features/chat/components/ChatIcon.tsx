import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { setOpenLogin } from "features/auth/loginSlice";
import { setNoti, setOpenChat } from "../chatSlice";
import { ReactComponent as ChatSvg } from "assets/chat.svg";

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
      className="fixed bottom-[5%] right-[5%] hidden h-16 w-16 cursor-pointer rounded-full bg-green-500 shadow-md hover:bg-green-400 lg:block"
    >
      <ChatSvg className="h-16 w-16 stroke-white p-3" />
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
