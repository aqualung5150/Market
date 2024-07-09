import { RootState } from "app/store";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Mybutton from "./MyButton";
import LinkLogin from "components/LinkLogin";
import React from "react";

const LoginButton = () => {
  const { pathname } = useLocation();
  const userId = useSelector((state: RootState) => state.user.id);

  return (
    <div className="flex cursor-pointer select-none items-center justify-center">
      {userId ? (
        <Mybutton />
      ) : (
        <LinkLogin
          className="flex h-10 w-[100px] flex-col items-center justify-center rounded bg-green-500 text-base font-semibold text-white"
          to={pathname}
        >
          로그인
        </LinkLogin>
      )}
    </div>
  );
};

export default React.memo(LoginButton);
