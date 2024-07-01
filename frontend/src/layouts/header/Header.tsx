import { ReactComponent as MenuIcon } from "../../assets/menu.svg";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setToggle } from "../menuSlice";
import NavLarge from "./NavDesktop";
import NavMobile from "./NavMobile";

const Header = () => {
  const navigate = useNavigate();
  const toggleMenu = useSelector((state: RootState) => state.menu.toggle);
  const dispatch = useDispatch();

  return (
    <header className="font-[D2Coding] z-10 border-b bg-white">
      <nav className="flex justify-between items-center w-[92%] h-20 mx-auto">
        <div className="flex items-center">
          <span
            className="w-14 text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Logo
          </span>
        </div>
        <NavLarge />
        <NavMobile />
        {toggleMenu ? (
          <CloseIcon
            className="lg:hidden w-10"
            onClick={() => dispatch(setToggle(false))}
          />
        ) : (
          <MenuIcon
            className="lg:hidden w-10"
            onClick={() => dispatch(setToggle(true))}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;
