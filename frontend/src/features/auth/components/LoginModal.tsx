import { useDispatch } from "react-redux";
import { setOpenLogin } from "../loginSlice";
import googleLoginImg from "../../../assets/google_login.svg";

const LoginModal = () => {
  console.log("LoginModal");
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=${process.env.REACT_APP_GOOGLE_RESPONSE_TYPE}&scope=email+profile`;
  const dispatch = useDispatch();

  return (
    <div
      className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50"
      onClick={() => {
        dispatch(setOpenLogin(false));
        sessionStorage.removeItem("redirect");
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="border-grey mx-2 flex h-[400px] w-[500px] flex-col items-center justify-center rounded border bg-white shadow-xl"
      >
        <div className="mt-10 flex items-center justify-center text-2xl">
          로그인
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <a className="m-2" href={googleAuthUrl}>
            <img
              className="w-[240px]"
              src={googleLoginImg}
              alt="Sign in with Google"
            />
          </a>
          <a className="m-2" href={googleAuthUrl}>
            <img
              className="w-[240px]"
              src={googleLoginImg}
              alt="Sign in with Google"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
