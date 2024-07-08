import { useDispatch } from "react-redux";
import { setOpenLogin } from "../loginSlice";
import { ReactComponent as GoogleLogin } from "../../../assets/googleLogin.svg";
import useFormInput from "../../../hooks/useFormInput";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { setUser } from "../../user/userSlice";

const LoginModal = () => {
  const { inputProps: email } = useFormInput();
  const { inputProps: password } = useFormInput();
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=${process.env.REACT_APP_GOOGLE_RESPONSE_TYPE}&scope=email+profile`;
  const dispatch = useDispatch();

  const handleSumbmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.value.length <= 0 || password.value.length <= 0) return;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signIn`,
        {
          email: email.value,
          password: password.value,
        },
      );

      dispatch(setUser(res.data));
      dispatch(setOpenLogin(false));
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
    <div
      className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50"
      onClick={() => {
        dispatch(setOpenLogin(false));
        sessionStorage.removeItem("redirect");
      }}
    >
      <form
        onSubmit={handleSumbmit}
        onClick={(e) => e.stopPropagation()}
        className="flex h-[400px] w-[500px] flex-col items-center justify-center gap-5 rounded bg-white shadow-xl"
      >
        <div className="text-2xl">로그인</div>
        <input
          type="email"
          className="h-12 w-56 rounded border p-2"
          {...email}
          placeholder="Email"
        />
        <input
          type="password"
          className="h-12 w-56 rounded border p-2"
          {...password}
          placeholder="Password"
        />
        <button type="submit" className="hidden" />
        <a href={googleAuthUrl}>
          <GoogleLogin className="w-56" />
        </a>
      </form>
    </div>
  );
};

export default LoginModal;
