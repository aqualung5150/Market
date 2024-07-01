import { createContext } from "react";
import { SocketContextProps } from "../types/context";
import { Socket } from "socket.io-client";

export const SocketContext = createContext<SocketContextProps>({
  socket: null,
});
