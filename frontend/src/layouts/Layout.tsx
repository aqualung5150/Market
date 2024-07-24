import { Outlet } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import Header from "./header/Header";
import { setToggle } from "./menuSlice";
import Footer from "./Footer";

const Layout = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex h-dvh w-dvw flex-col">
      <Header />
      <main
        className="mt-16 flex flex-1 justify-center bg-white"
        onClick={() => dispatch(setToggle(false))}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
