import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
import ChatIcon from "../features/chat/components/ChatIcon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import Chat from "../features/chat/components/Chat";
import LoginModal from "../features/auth/components/LoginModal";
import { setToggle } from "./menuSlice";

const Layout = ({ children }: LayoutProps) => {
  const openChat = useSelector((state: RootState) => state.chat.open);
  const openLogin = useSelector((state: RootState) => state.login.openLogin);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div
        className="flex-1 bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]"
        onClick={() => dispatch(setToggle(false))}
      >
        {children || <Outlet />}
      </div>
      <Footer />
      <ChatIcon />
      {openChat && <Chat />}
      {openLogin && <LoginModal />}
    </div>
  );
};

export default Layout;
