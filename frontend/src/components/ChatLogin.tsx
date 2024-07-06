import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setNoti, setOpenChat } from "../features/chat/chatSlice";
import { setOpenLogin } from "../features/auth/loginSlice";
import { RootState } from "../app/store";

const ChatLogin = ({ children }: any) => {
  const { pathname } = useLocation();
  const userId = useSelector((state: RootState) => state.user.id);
  const noti = useSelector((state: RootState) => state.chat.noti);
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
      {children}
    </div>
  );
};

export default ChatLogin;
