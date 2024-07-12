import { ReactComponent as MenuIcon } from "assets/menu.svg";
import { ReactComponent as CloseIcon } from "assets/close.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useConnect from "features/auth/hooks/useConnect";
import { RootState } from "app/store";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";
import LoginModal from "features/auth/components/LoginModal";
import { SocketContext } from "context/SocketContext";
import Chat from "features/chat/components/Chat";
import ChatIcon from "features/chat/components/ChatIcon";
import { setToggle } from "layouts/menuSlice";
import React from "react";

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
          <Link
            to="/"
            className="w-14 cursor-pointer text-2xl font-bold text-green-500"
          >
            Logo
          </Link>
        </div>
        <NavDesktop />
        <NavMobile toggle={toggle} />
        {toggle ? (
          <CloseIcon
            className="h-10 w-10 stroke-black lg:hidden"
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
