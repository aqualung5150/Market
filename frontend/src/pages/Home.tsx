import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { setOpenChat, setSendTo } from "../features/chat/chatSlice";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex h-full w-full flex-col">
      <div className="w-10">
        <Button
          text="Message to id: 6"
          onClick={() => {
            dispatch(setOpenChat(true));
            dispatch(setSendTo(6));
          }}
        />
      </div>
    </div>
  );
};

export default Home;
