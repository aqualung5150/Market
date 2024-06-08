import { createContext } from "react";
import { LoggedInContextProps } from "../@types/context";

export const LoggedInContext = createContext<LoggedInContextProps>({
  loggedIn: false,
  setLoggedIn: () => undefined,
});
