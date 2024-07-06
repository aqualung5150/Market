import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useLocation } from "react-router-dom";
import MyButton from "./MyButton";
import React from "react";
import LinkLogin from "../../components/LinkLogin";

const LoginButton = () => {
  const { pathname } = useLocation();
  const userId = useSelector((state: RootState) => state.user.id);

  return (
    <div className="flex cursor-pointer select-none items-center justify-center">
      {userId ? (
        <MyButton />
      ) : (
        <LinkLogin
          className="flex h-10 w-[100px] flex-col items-center justify-center rounded bg-green-400 font-semibold"
          to={pathname}
        >
          로그인
        </LinkLogin>
      )}
    </div>
  );
};

export default React.memo(LoginButton);
