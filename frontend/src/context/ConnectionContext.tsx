import { createContext } from "react";
import { ConnectionContextProps } from "../types/context";
import { Socket } from "socket.io-client";

export const ConnectionContext = createContext<ConnectionContextProps>({
  connection: false,
  setConnection: () => undefined,
  chatSocket: undefined,
});
