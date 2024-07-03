import React, { useState } from "react";
import LoginButton from "./LoginButton";
import SearchBar from "./SearchBar";
import CategoryDropdown from "../../features/product/components/category/CategoryDropdown";
import { Link } from "react-router-dom";
import LinkLogin from "../../components/LinkLogin";

const NavDesktop = () => {
  console.log("NavLarge");
  const [openCategory, setOpenCategory] = useState(false);
  return (
    <div className="hidden lg:flex items-center w-full flex-row bg-white">
      <ul className="flex flex-row w-full justify-evenly items-center">
        <li
          onMouseEnter={() => setOpenCategory(true)}
          onMouseLeave={() => setOpenCategory(false)}
          className="relative hover:text-green-500 cursor-pointer"
        >
          <Link to="/search">구매하기</Link>
          {openCategory && <CategoryDropdown />}
        </li>
        <LinkLogin to="/product/form">
          <li className="hover:text-green-500 cursor-pointer">판매하기</li>
        </LinkLogin>
      </ul>
      <div className="w-full h-10 px-2 max-w-[400px]">
        <SearchBar />
      </div>
      <LoginButton />
    </div>
  );
};

export default React.memo(NavDesktop);
