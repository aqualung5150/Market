import { RootState } from "app/store";
import { SocketContext } from "context/SocketContext";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as CommunityIcon } from "assets/community.svg";
import { ReactComponent as SendIcon } from "assets/send.svg";
import useFormInput from "hooks/useFormInput";
import MessageInput from "./MessageInput";

const EmptyRoom = () => {
  const { inputProps: newMessage } = useFormInput();
  const socket = useContext(SocketContext).socket;
  const sendTo = useSelector((state: RootState) => state.chat.sendTo);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket?.emit("createChannelReq", {
      body: newMessage.value,
      sendTo: sendTo,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full w-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 text-2xl font-bold">
        <CommunityIcon className="h-32 w-32" />
        <div>판매자와 대화를 시작하세요.</div>
      </div>
      {sendTo !== 0 && (
        // <div className="flex w-full items-center gap-2 border-t bg-gray-100 p-2">
        //   <input
        //     className="w-full rounded border p-2"
        //     placeholder="메세지를 입력하세요."
        //     {...newMessage}
        //   />
        //   <button type="submit" className="h-9 w-9">
        //     <SendIcon className="h-9 w-9 stroke-sky-400" />
        //   </button>
        // </div>
        <MessageInput {...newMessage} />
      )}
    </form>
  );
};

export default EmptyRoom;
