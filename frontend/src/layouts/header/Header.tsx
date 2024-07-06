import { ReactComponent as MenuIcon } from "../../assets/menu.svg";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setToggle } from "../menuSlice";
import NavMobile from "./NavMobile";
import React from "react";
import { SocketContext } from "../../context/SocketContext";
import useConnect from "../../features/auth/hooks/useConnect";
import Chat from "../../features/chat/components/Chat";
import ChatIcon from "../../features/chat/components/ChatIcon";
import LoginModal from "../../features/auth/components/LoginModal";
import NavDesktop from "./NavDesktop";

const Header = () => {
  console.log("header");
  const socket = useConnect();
  const openChat = useSelector((state: RootState) => state.chat.open);
  const openLogin = useSelector((state: RootState) => state.login.openLogin);
  const toggle = useSelector((state: RootState) => state.menu.toggle);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-10 border-b bg-white font-[D2Coding]">
      <nav className="mx-auto flex h-16 w-[92%] items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="w-14 cursor-pointer text-2xl font-bold">
            Logo
          </Link>
        </div>
        <NavDesktop />
        <NavMobile toggle={toggle} />
        {toggle ? (
          <CloseIcon
            className="h-10 w-10 lg:hidden"
            onClick={() => dispatch(setToggle(false))}
          />
        ) : (
          <MenuIcon
            className="h-10 w-10 lg:hidden"
            onClick={() => dispatch(setToggle(true))}
          />
        )}
      </nav>
      <ChatIcon />
      <SocketContext.Provider value={socket}>
        {openChat && <Chat />}
      </SocketContext.Provider>
      {openLogin && <LoginModal />}
    </header>
  );
};

export default React.memo(Header);
