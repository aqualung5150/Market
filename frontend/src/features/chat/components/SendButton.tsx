import { useDispatch, useSelector } from "react-redux";
import { setOpenChat, setSendTo } from "../chatSlice";
import { setOpenLogin } from "../../auth/loginSlice";
import { useLocation } from "react-router-dom";
import { RootState } from "../../../app/store";

const SendButton = ({ className, text, sendTo }: any) => {
  console.log("sendButton!");
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
