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
    <div className="flex justify-center items-center cursor-pointer select-none">
      {userId ? (
        <MyButton />
      ) : (
        <LinkLogin
          className="rounded bg-green-400 font-semibold flex flex-col justify-center items-center w-[100px] h-10"
          to={pathname}
        >
          로그인
        </LinkLogin>
      )}
    </div>
  );
};

export default React.memo(LoginButton);
