import { createContext } from "react";
import { ConnectionContextProps } from "../@types/context";

export const ConnectionContext = createContext<ConnectionContextProps>({
  connection: false,
  setConnection: () => undefined,
});
