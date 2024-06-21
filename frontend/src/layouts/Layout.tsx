import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import ChatIcon from "../features/chat/components/ChatIcon";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex flex-row flex-1 w-full justify-between bg-white">
        {children || <Outlet />}
      </div>
      <Footer />
      <ChatIcon />
    </div>
  );
};

export default Layout;
