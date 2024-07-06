import { useState } from "react";
import useNavLogin from "../../features/auth/hooks/useNavLogin";
import CategoryDropdown from "../../features/product/components/category/CategoryDropdown";
import homeButton from "../../assets/home_button.png";
import LoginButton from "./LoginButton";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";

const Navbar = () => {
  const navLogin = useNavLogin();
  const [openCategory, setOpenCategory] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="mx-auto flex h-20 w-[92%] items-center justify-between">
      <div className="flex items-center gap-6">
        <MenuIcon className="w-[80px] md:hidden" />
        <img
          className="w-14 cursor-pointer"
          src={homeButton}
          onClick={() => navigate("/")}
        />
      </div>
      <div className="absolute left-0 top-[-100%] min-h-[60vh] w-full bg-white md:static md:min-h-fit">
        <ul className="flex flex-col md:flex-row md:items-center md:justify-evenly">
          <li
            onMouseEnter={() => setOpenCategory(true)}
            onMouseLeave={() => setOpenCategory(false)}
            className="relative cursor-pointer hover:text-green-500"
          >
            구매하기
            {openCategory && <CategoryDropdown />}
          </li>
          <li
            className="cursor-pointer hover:text-green-500"
            onClick={() => navLogin("/product/form")}
          >
            판매하기
          </li>
        </ul>
      </div>
      <div className="invisible m-2 md:visible md:static md:w-[300px]">
        <SearchBar />
      </div>
      <div>
        <LoginButton />
      </div>
    </nav>
  );
};

export default Navbar;
