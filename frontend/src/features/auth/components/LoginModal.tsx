import { useDispatch } from "react-redux";
import { ReactComponent as GoogleLogin } from "assets/googleLogin.svg";
import { useState } from "react";
import useFormInput from "hooks/useFormInput";
import axios from "axios";
import { setUser } from "features/user/userSlice";
import { setOpenLogin } from "../loginSlice";
import { Link } from "react-router-dom";

const LoginModal = () => {
  const { inputProps: email } = useFormInput("test@test.com");
  const { inputProps: password } = useFormInput("12341234aA!");
  const [error, setError] = useState("");
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

      setError("");
      dispatch(setUser(res.data));
      dispatch(setOpenLogin(false));
    } catch (err: any) {
      setError("일치하는 계정이 없습니다.");
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
          // type="email // -> 'admin'으로 로그인하려 하면 브라우저에서 계속 email형식 검사함.
          className={`h-12 w-56 rounded border p-2 outline-none ${error && "border-red-500"}`}
          {...email}
          placeholder="Email"
        />
        <input
          type="password"
          className={`h-12 w-56 rounded border p-2 outline-none ${error && "border-red-500"}`}
          {...password}
          placeholder="Password"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" className="hidden" />
        <a href={googleAuthUrl}>
          <GoogleLogin className="h-14 w-56" />
        </a>
        <Link
          to="/signUp"
          className="text-sm text-green-500"
          onClick={() => dispatch(setOpenLogin(false))}
        >
          회원가입
        </Link>
      </form>
    </div>
  );
};

export default LoginModal;
