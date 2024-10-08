import { useContext, useEffect, useState } from "react";
import { SocketContext } from "context/SocketContext";
import { useDispatch } from "react-redux";
import { setOpenChat } from "../chatSlice";

const useChat = () => {
  const socket = useContext(SocketContext).socket;
  const [selectedChannelId, setSelectedChannelId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    // prevent background scroll
    document.body.style.overflow = "hidden";
    // close chat when go back
    const onPopState = () => dispatch(setOpenChat(false));
    window.addEventListener("popstate", onPopState, { once: true });
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("createChannelRes", setSelectedChannelId);
    return () => {
      socket.off("createChannelRes", setSelectedChannelId);
    };
  }, [socket]);

  return { selectedChannelId, setSelectedChannelId };
};

export default useChat;
