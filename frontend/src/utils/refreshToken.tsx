import axios from "axios";
import setLocalStorage from "./setLocalStorage";

const refreshToken = async () => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/refresh`);
};

export default refreshToken;
