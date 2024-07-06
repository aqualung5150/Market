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
      className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50"
      onClick={() => {
        dispatch(setOpenChat(false));
        dispatch(setSendTo(0));
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="border-grey flex h-full w-full flex-col border bg-white shadow-xl lg:h-3/4 lg:w-3/4 lg:rounded"
      >
        <ChatHeader {...{ selectedChannelId, setSelectedChannelId }} />
        <div className="flex h-full w-full overflow-auto">
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
