import axios from "axios";
import setLocalStorage from "./setLocalStorage";
import logout from "./logout";
import { jwt } from "../data/jwt";

const refreshToken = async () => {
  await axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/auth/refresh`)
    .then((res) => {
      console.log('success - "' + res.data.message + '"');
      jwt.setToken(res.data.access_token);
      setLocalStorage({
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        nickname: res.data.nickname,
        iat: res.data.iat,
        exp: res.data.exp,
      });
    });
};

export default refreshToken;
