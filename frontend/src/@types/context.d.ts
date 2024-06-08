import { AxiosInstance } from "axios";

interface ConnectionContextProps {
  connection: boolean;
  setConnection: Dispatch<SetStateAction<boolean>>;
}
