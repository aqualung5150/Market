import { Link } from "react-router-dom";
import logout from "../../utils/logout";
import Button from "../Button";
import isLoggedIn from "../../utils/isLoggedIn";

const LoginButton = () => {
  const login = isLoggedIn();
  return (
    <div>
      {login ? (
        <Button text="로그아웃" onClick={logout} />
      ) : (
        <Link to={"/login"}>
          <Button text="로그인" />
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
