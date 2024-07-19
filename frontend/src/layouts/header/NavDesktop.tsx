import LinkLogin from "components/LinkLogin";
import CategoryDropdown from "features/product/components/category/CategoryDropdown";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";

const NavDesktop = () => {
  const [openCategory, setOpenCategory] = useState(false);
  return (
    <div className="hidden w-full flex-row items-center bg-white lg:flex">
      <ul className="flex w-full flex-row items-center justify-evenly">
        <li
          onMouseEnter={() => setOpenCategory(true)}
          onMouseLeave={() => setOpenCategory(false)}
          className="relative cursor-pointer hover:text-green-500"
        >
          <Link to="/search?page=1">구매하기</Link>
          {openCategory && <CategoryDropdown />}
        </li>
        <LinkLogin to="/product/form?type=regist">
          <li className="cursor-pointer hover:text-green-500">판매하기</li>
        </LinkLogin>
      </ul>
      <div className="h-10 w-full max-w-[400px] px-3">
        <SearchBar />
      </div>
      <LoginButton />
    </div>
  );
};

export default React.memo(NavDesktop);
