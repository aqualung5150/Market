import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
import ChatIcon from "../features/chat/components/ChatIcon";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Chat from "../features/chat/components/Chat";
import LoginModal from "../features/auth/components/LoginModal";

const Layout = ({ children }: LayoutProps) => {
  const openChat = useSelector((state: RootState) => state.chat.open);
  const openLogin = useSelector((state: RootState) => state.login.openLogin);
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex flex-row flex-1 w-full justify-between bg-white">
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
