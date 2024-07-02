import ChatRoom from "./ChatRoom";
import useChat from "../hooks/useChat";
import ChatHeader from "./ChatHeader";
import Channels from "./Channels";
import { useDispatch, useSelector } from "react-redux";
import { setOpenChat, setSendTo } from "../chatSlice";
import EmptyRoom from "./EmptyRoom";
import { RootState } from "../../../app/store";

const Chat = () => {
  const sendTo = useSelector((state: RootState) => state.chat.sendTo);
  const { selectedChannelId, setSelectedChannelId } = useChat();
  const dispatch = useDispatch();

  return (
    <div
      className="fixed z-10 left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center"
      onClick={() => {
        dispatch(setOpenChat(false));
        dispatch(setSendTo(0));
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full h-full bg-white lg:h-3/4  lg:w-3/4  flex flex-col border border-grey lg:rounded shadow-xl"
      >
        <ChatHeader {...{ selectedChannelId, setSelectedChannelId }} />
        <div className="flex w-full h-full overflow-auto">
          <div
            className={`${
              selectedChannelId || sendTo ? "hidden" : "w-full"
            } lg:inline-block lg:w-1/3`}
          >
            <Channels {...{ selectedChannelId, setSelectedChannelId }} />
          </div>
          <div
            className={`${
              selectedChannelId || sendTo ? "w-full" : "hidden"
            } lg:inline-block lg:w-2/3`}
          >
            {selectedChannelId ? (
              // set key props to re-mount component
              <ChatRoom
                key={selectedChannelId}
                selectedChannelId={selectedChannelId}
              />
            ) : (
              <EmptyRoom />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
