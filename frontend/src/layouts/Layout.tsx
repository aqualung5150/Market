import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { setToggle } from "./menuSlice";
import React from "react";

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch();
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div
        className="flex flex-1 justify-center bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]"
        onClick={() => dispatch(setToggle(false))}
      >
        {children || <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
