import { AxiosInstance } from "axios";

interface LoggedInContextProps {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}
