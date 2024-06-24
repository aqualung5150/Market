import { useDispatch } from "react-redux";
import { setOpenLogin } from "../loginSlice";
import googleLoginImg from "../../../assets/google_login.svg";

const LoginModal = () => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=${process.env.REACT_APP_GOOGLE_RESPONSE_TYPE}&scope=email+profile`;
  const dispatch = useDispatch();

  return (
    <div
      className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center"
      onClick={() => {
        dispatch(setOpenLogin(false));
        sessionStorage.removeItem("redirect");
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white h-[400px]  w-[500px]  flex flex-col justify-center items-center border border-grey rounded shadow-xl"
      >
        <div className="flex justify-center items-center text-2xl mt-10">
          로그인
        </div>
        <div className="flex flex-col flex-1 justify-center items-center">
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
