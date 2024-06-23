import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../context/SocketContext";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";

const useChat = () => {
  const socket = useContext(SocketContext).socket;
  const [selectedChannelId, setSelectedChannelId] = useState(0);

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
