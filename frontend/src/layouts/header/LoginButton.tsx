import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useLocation } from "react-router-dom";
import { setOpenLogin } from "../../features/auth/loginSlice";
import Dropdown from "./Dropdown";

const LoginButton = () => {
  const { pathname } = useLocation();
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();

  const handleLogin = (e: React.MouseEvent<HTMLDivElement>) => {
    sessionStorage.setItem("redirect", pathname);
    dispatch(setOpenLogin(true));
  };

  return (
    <div className="flex justify-center items-center cursor-pointer select-none">
      {userId ? (
        <Dropdown />
      ) : (
        <div
          className="rounded bg-green-400 font-semibold flex flex-col justify-center items-center w-[100px] h-10"
          onClick={handleLogin}
        >
          로그인
        </div>
      )}
    </div>
  );
};

export default LoginButton;
