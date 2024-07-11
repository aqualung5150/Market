import { useDispatch } from "react-redux";
import { setOpenChat, setSendTo } from "../features/chat/chatSlice";
import throttle from "../utils/throttle";
import { useCallback, useState } from "react";
import Carousel from "components/Carousel";

const Home = () => {
  // const [value, setValue] = useState("");
  // const throttleConsoleLog = useCallback(
  //   throttle((text: string) => console.log(text), 1000),
  //   [],
  // );
  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(e.target.value);
  //   throttleConsoleLog("throttle");
  // };
  return (
    <div className="flex h-full w-full flex-col">
      {/* <Carousel>

      </Carousel> */}
      {/* <input
        className="border"
        placeholder="throttle test"
        value={value}
        onChange={onChange}
      /> */}
    </div>
  );
};

export default Home;
