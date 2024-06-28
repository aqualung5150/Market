import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../app/store";
import { setOpenLogin } from "../loginSlice";

const useNavLogin = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navLogin = (loggedIn: string, afterLogin: string = loggedIn): void => {
    if (!userId) {
      sessionStorage.setItem("redirect", afterLogin);
      dispatch(setOpenLogin(true));
    } else navigate(loggedIn);
  };

  return navLogin;
};

export default useNavLogin;
