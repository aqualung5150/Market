import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { setOpenLogin } from "../features/auth/loginSlice";
import { useCallback } from "react";

const LinkLogin = ({
  className,
  onClick,
  to,
  redirectAfterLogin = to,
  children,
}: any) => {
  const userId = useSelector((state: RootState) => state.user.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = useCallback((to: string, redirect: string) => {
    if (!userId) {
      sessionStorage.setItem("redirect", redirect);
      dispatch(setOpenLogin(true));
    } else navigate(to);
  }, []);

  return (
    <div
      className={className}
      onClick={() => {
        onClick && onClick();
        handleClick(to, redirectAfterLogin);
      }}
    >
      {children}
    </div>
  );
};

export default LinkLogin;
