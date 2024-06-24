import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setOpenLogin } from "../../features/auth/loginSlice";

const Navbar = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pathAuthCheck = (navigateTo: string, redirect: string = navigateTo) => {
    if (!userId) {
      sessionStorage.setItem("redirect", redirect);
      dispatch(setOpenLogin(true));
    } else navigate(navigateTo);
  };

  return (
    <nav className="flex w-full justify-center items-center font-semibold text-xl">
      <ul className="flex w-3/4 justify-between">
        <li onClick={() => pathAuthCheck("/dummy")}>Dummy</li>
        <li>
          <Link to="/foo">Foo</Link>
        </li>
        <li>
          <Link to={`/users/${userId}`}>중고거래</Link>
        </li>
        {/* <li onClick={() => pathAuthCheck(`/users/${userId}`, pathname)}>
          마이페이지
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
