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
    <header className="sticky top-0 font-[D2Coding] z-10 border-b bg-white">
      <nav className="flex justify-between items-center w-[92%] h-16 mx-auto">
        <div className="flex items-center">
          <Link to="/" className="w-14 text-2xl font-bold cursor-pointer">
            Logo
          </Link>
        </div>
        <NavDesktop />
        <NavMobile toggle={toggle} />
        {toggle ? (
          <CloseIcon
            className="lg:hidden w-10 h-10"
            onClick={() => dispatch(setToggle(false))}
          />
        ) : (
          <MenuIcon
            className="lg:hidden w-10 h-10"
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
