import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import ChatIcon from "../features/chat/components/ChatIcon";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Chat from "../features/chat/components/Chat";

const Layout = ({ children }: LayoutProps) => {
  const openChat = useSelector((state: RootState) => state.chat.open);
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex flex-row flex-1 w-full justify-between bg-white">
        {children || <Outlet />}
      </div>
      <Footer />
      <ChatIcon />
      {openChat && <Chat />}
    </div>
  );
};

export default Layout;
