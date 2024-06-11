import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import userSlice from "../features/user/userSlice";

const logout = async (redirect: string | null) => {
  const url = `${process.env.REACT_APP_BASE_URL}/api/auth/logout`;
  await axios.post(url).catch(() => {});

  // localStorage.clear();
  if (redirect) window.location.href = redirect;
};

// export default logout;
