import axios from "axios";
import { createContext } from "react";

export const AxoisContext = createContext({
  instance: axios.create(),
});
