import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { setOpenChat, setSendTo } from "../features/chat/chatSlice";
import throttle from "../utils/throttle";
import { useCallback, useState } from "react";

const Home = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const throttleConsoleLog = useCallback(
    throttle((text: string) => console.log(text), 1000),
    [],
  );
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    throttleConsoleLog("throttle");
  };
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
      <input
        className="border"
        placeholder="throttle test"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Home;
