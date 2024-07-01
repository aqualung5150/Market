import { useState } from "react";
import useNavLogin from "../../features/auth/hooks/useNavLogin";
import LoginButton from "./LoginButton";
import SearchBar from "./SearchBar";
import CategoryDropdown from "../../features/product/components/category/CategoryDropdown";

const NavLarge = () => {
  const navLogin = useNavLogin();
  const [openCategory, setOpenCategory] = useState(false);
  return (
    <div className="hidden lg:flex items-center w-full flex-row bg-white">
      <ul className="flex flex-row w-full justify-evenly items-center">
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
      <div className="w-full h-10 px-2 max-w-[400px]">
        <SearchBar />
      </div>
      <LoginButton />
    </div>
  );
};

export default NavLarge;
