import ChatRoom from "./ChatRoom";
import useChat from "../hooks/useChat";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import Channels from "./Channels";
import { useDispatch } from "react-redux";
import { setOpenChat, setSendTo } from "../chatSlice";
import EmptyRoom from "./EmptyRoom";

const Chat = () => {
  const { selectedChannelId, setSelectedChannelId } = useChat();
  const dispatch = useDispatch();

  return (
    <div
      className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center"
      onClick={() => {
        dispatch(setOpenChat(false));
        dispatch(setSendTo(0));
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white h-3/4  w-3/4  flex flex-col border border-grey rounded shadow-xl"
      >
        <ChatHeader />
        <ChatBody>
          <Channels
            selectedChannelId={selectedChannelId}
            setSelectedChannelId={setSelectedChannelId}
          />
          {selectedChannelId ? (
            <ChatRoom selectedChannelId={selectedChannelId} />
          ) : (
            <EmptyRoom />
          )}
        </ChatBody>
      </div>
    </div>
  );
};

export default Chat;
