import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "app/store";
import { setOpenLogin } from "features/auth/loginSlice";
import { setOpenChat, setSendTo } from "../chatSlice";

const SendButton = ({ className, text, sendTo }: any) => {
  const { pathname } = useLocation();
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!userId) {
      sessionStorage.setItem("redirect", pathname);
      dispatch(setOpenLogin(true));
    } else {
      dispatch(setSendTo(sendTo));
      dispatch(setOpenChat(true));
    }
  };

  return (
    <button className={className} onClick={handleClick}>
      {text}
    </button>
  );
};

export default SendButton;
