import { SetStateAction, createContext } from "react";

export const LoggedInContext = createContext<LoggedInContextProps>({
  loggedIn: false,
  setLoggedIn: () => undefined,
});
