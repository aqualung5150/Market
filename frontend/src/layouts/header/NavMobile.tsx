import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import SearchBar from "./SearchBar";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as AngleDownIcon } from "../../assets/angleDown.svg";
import { ReactComponent as SendIcon } from "../../assets/send.svg";
import categoryData from "../../features/product/data/category.json";
import { Link, useLocation } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { logout } from "../../features/user/userSlice";
import { setOpenChat } from "../../features/chat/chatSlice";
import LinkLogin from "../../components/LinkLogin";
import { setToggle } from "../menuSlice";

const NavMobile = ({ toggle }: any) => {
  console.log("NavMobile");
  const { pathname } = useLocation();
  const userId = useSelector((state: RootState) => state.user.id);
  const [openCategory, setOpenCategory] = useState(false);
  const [openMypage, setOpenMypage] = useState(false);
  const dispatch = useDispatch();
  const noti = useSelector((state: RootState) => state.chat.noti);

  const handleCloseMenu = useCallback(() => {
    dispatch(setToggle(false));
  }, []);

  useEffect(() => {
    if (!toggle) {
      setOpenCategory(false);
      setOpenMypage(false);
    }
  }, [toggle]);

  return (
    <div
      className={`fixed left-0 flex w-full flex-col gap-4 bg-white p-4 text-lg duration-500 lg:hidden ${
        toggle ? "top-16" : "top-[-100%]"
      }`}
    >
      <div className="flex w-full items-center gap-2">
        <SearchIcon className="h-10 w-10" />
        <SearchBar />
      </div>
      <div>
        <ul className="flex flex-1 flex-col gap-1">
          <li className="flex items-center justify-between text-xl font-semibold">
            <Link onClick={() => handleCloseMenu()} to="/search?page=1">
              구매하기
            </Link>
            <AngleDownIcon
              onClick={() => setOpenCategory(!openCategory)}
              className="h-7 w-7"
            />
          </li>
          {openCategory && (
            <ul>
              {Object.values(categoryData).map((category) => (
                <li key={category.id} onClick={() => handleCloseMenu()}>
                  <Link to={`/search?category=${category.id}&page=1`}>
                    - {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </ul>
      </div>
      <LinkLogin
        className="w-fit text-xl font-semibold"
        to="/product/form?type=regist"
        onClick={handleCloseMenu}
      >
        <span>판매하기</span>
      </LinkLogin>
      {userId && (
        <>
          <div>
            <ul className="flex flex-1 flex-col gap-1">
              <li className="flex items-center justify-between text-xl font-semibold">
                <Link onClick={() => handleCloseMenu()} to={`/users/${userId}`}>
                  마이페이지
                </Link>
                <AngleDownIcon
                  onClick={() => setOpenMypage(!openMypage)}
                  className="h-7 w-7"
                />
              </li>
              {openMypage && (
                <ul>
                  <li>- 판매내역</li>
                  <li>- 찜한 상품</li>
                  <li onClick={() => handleCloseMenu()}>
                    <Link to={`/users/${userId}/edit`}>- 정보 수정</Link>
                  </li>
                </ul>
              )}
            </ul>
          </div>
          <div
            className="flex w-fit items-center gap-1 text-xl font-semibold"
            onClick={() => {
              handleCloseMenu();
              dispatch(setOpenChat(true));
            }}
          >
            {noti && <p className="mr-1 h-4 w-4 rounded-full bg-red-500" />}
            <span>채팅하기</span>
            <SendIcon className="h-7 w-7 stroke-sky-300" />
          </div>
        </>
      )}

      {!userId ? (
        <LinkLogin
          to={pathname}
          className="w-24 rounded border-2 border-green-500 text-center font-bold text-green-500"
        >
          로그인
        </LinkLogin>
      ) : (
        <span
          onClick={() => dispatch(logout("/"))}
          className="w-fit text-sm text-gray-600"
        >
          로그아웃
        </span>
      )}
    </div>
  );
};

export default React.memo(NavMobile);
