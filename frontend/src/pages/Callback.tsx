import Loading from "../components/Loading";
import useOauthCallback from "../features/auth/hooks/useOauthCallback";

const Callback = () => {
  useOauthCallback();

  return (
    <div className="w-scrren h-screen">
      <Loading text="로그인" />
    </div>
  );
};

export default Callback;
