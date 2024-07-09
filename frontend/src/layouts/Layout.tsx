import { Outlet } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import Header from "./header/Header";
import { setToggle } from "./menuSlice";
import Footer from "./Footer";

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch();
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div
        // className="flex flex-1 justify-center bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]"
        className="flex flex-1 justify-center bg-white"
        onClick={() => dispatch(setToggle(false))}
      >
        {children || <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
