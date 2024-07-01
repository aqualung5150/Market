import { useState } from "react";
import useNavLogin from "../../features/auth/hooks/useNavLogin";
import CategoryDropdown from "../../features/product/components/category/CategoryDropdown";
import homeButton from "../../assets/home_button.png";
import LoginButton from "./LoginButton";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";

const Navbar = () => {
  const navLogin = useNavLogin();
  const [openCategory, setOpenCategory] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center w-[92%] h-20 mx-auto">
      <div className="flex items-center gap-6">
        <MenuIcon className="md:hidden w-[80px]" />
        <img
          className="w-14 cursor-pointer"
          src={homeButton}
          onClick={() => navigate("/")}
        />
      </div>
      <div className="md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] w-full">
        <ul className="flex md:flex-row flex-col md:justify-evenly md:items-center">
          <li
            onMouseEnter={() => setOpenCategory(true)}
            onMouseLeave={() => setOpenCategory(false)}
            className="relative hover:text-green-500 cursor-pointer"
          >
            구매하기
            {openCategory && <CategoryDropdown />}
          </li>
          <li
            className="hover:text-green-500 cursor-pointer"
            onClick={() => navLogin("/product/form")}
          >
            판매하기
          </li>
        </ul>
      </div>
      <div className="invisible md:visible md:static md:w-[300px] m-2">
        <SearchBar />
      </div>
      <div>
        <LoginButton />
      </div>
    </nav>
  );
};

export default Navbar;
