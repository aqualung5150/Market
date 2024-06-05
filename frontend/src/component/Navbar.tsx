import { Link } from "react-router-dom";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import Button from "./Button";
import logout from "../utils/logout";

const Navbar = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <div>
      {isLoggedIn ? (
        <Button text="로그아웃" onClick={logout} />
      ) : (
        <Link to={"/login"}>
          <Button text="로그인" />
        </Link>
      )}
    </div>
  );
};

export default Navbar;
