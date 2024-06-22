import { ChatProps } from "../../../@types/chat";
import ChatRoom from "./ChatRoom";
import useChat from "../hooks/useChat";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import NewChat from "./NewChat";
import Channels from "./Channels";
import { useDispatch, useSelector } from "react-redux";
import { setOpenChat, setSendTo } from "../chatSlice";
import { RootState } from "../../../app/store";

const Chat = () => {
  const { socket, user, selectedChannelId, setSelectedChannelId } = useChat();
  const sendTo = useSelector((state: RootState) => state.chat.sendTo);
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
            socket={socket}
            userId={user.id}
            selectedChannelId={selectedChannelId}
            setSelectedChannelId={setSelectedChannelId}
          />
          {selectedChannelId ? (
            <ChatRoom
              socket={socket}
              userId={user.id}
              selectedChannelId={selectedChannelId}
            />
          ) : (
            <>
              {sendTo ? (
                <NewChat socket={socket} sendTo={sendTo} />
              ) : (
                <div className="w-2/3 flex justify-center items-center">
                  no room
                </div>
              )}
            </>
          )}
        </ChatBody>
      </div>
    </div>
  );
};

export default Chat;
