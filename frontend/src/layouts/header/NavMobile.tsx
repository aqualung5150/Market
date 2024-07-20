import { ReactComponent as AngleDownIcon } from "assets/angleDown.svg";
import { ReactComponent as AngleUpIcon } from "assets/angleUp.svg";
import { ReactComponent as SendIcon } from "assets/send.svg";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { RootState } from "app/store";
import LinkLogin from "components/LinkLogin";
import { setToggle } from "layouts/menuSlice";
import { logout } from "features/user/userSlice";
import SearchBar from "./SearchBar";
import categoryData from "features/product/data/category.json";
import { setNoti, setOpenChat } from "features/chat/chatSlice";

const NavMobile = ({ toggle }: { toggle: boolean }) => {
  const { pathname } = useLocation();
  const userId = useSelector((state: RootState) => state.user.id);
  const [openCategory, setOpenCategory] = useState(false);
  const [openMypage, setOpenMypage] = useState(false);
  const dispatch = useDispatch();
  const noti = useSelector((state: RootState) => state.chat.noti);

  useEffect(() => {
    if (!toggle) {
      setOpenCategory(false);
      setOpenMypage(false);
    }
  }, [toggle]);

  return (
    <div
      className={`fixed left-0 flex w-full flex-col gap-4 bg-white p-4 text-lg shadow duration-500 lg:hidden ${
        toggle ? "top-16" : "top-[-100%]"
      }`}
    >
      <SearchBar />
      <div>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center justify-between text-xl font-semibold">
            <Link
              onClick={() => dispatch(setToggle(false))}
              to="/search?page=1"
            >
              구매하기
            </Link>
            {openCategory ? (
              <AngleUpIcon
                onClick={() => setOpenCategory(false)}
                className="h-7 w-7"
              />
            ) : (
              <AngleDownIcon
                onClick={() => setOpenCategory(true)}
                className="h-7 w-7"
              />
            )}
          </li>
          {openCategory && (
            <>
              {Object.values(categoryData).map((category) => (
                <li
                  key={category.id}
                  onClick={() => dispatch(setToggle(false))}
                >
                  <Link to={`/search?category=${category.id}&page=1`}>
                    - {category.label}
                  </Link>
                </li>
              ))}
            </>
          )}
          <li>
            <LinkLogin
              className="text-xl font-semibold"
              to="/product/form?type=regist"
              onClick={() => dispatch(setToggle(false))}
            >
              <span>판매하기</span>
            </LinkLogin>
          </li>
          {userId && (
            <>
              <li className="flex items-center justify-between text-xl font-semibold">
                <Link
                  onClick={() => dispatch(setToggle(false))}
                  to={`/users/${userId}`}
                >
                  마이페이지
                </Link>
                {openMypage ? (
                  <AngleUpIcon
                    onClick={() => setOpenMypage(false)}
                    className="h-7 w-7"
                  />
                ) : (
                  <AngleDownIcon
                    onClick={() => setOpenMypage(true)}
                    className="h-7 w-7"
                  />
                )}
              </li>
              {openMypage && (
                <>
                  <li>- 판매내역</li>
                  <li>- 찜한 상품</li>
                  <li onClick={() => dispatch(setToggle(false))}>
                    <Link to={`/users/${userId}/edit`}>- 정보 수정</Link>
                  </li>
                </>
              )}
              <li
                className="flex w-fit items-center gap-2 text-xl font-semibold"
                onClick={() => {
                  dispatch(setToggle(false));
                  dispatch(setOpenChat(true));
                  dispatch(setNoti(false));
                }}
              >
                <span>채팅하기</span>
                {noti ? (
                  <span className="relative mr-1 h-3 w-3 rounded-full bg-red-500">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-red-500" />
                  </span>
                ) : (
                  <SendIcon className="h-7 w-7 stroke-sky-300" />
                )}
              </li>
            </>
          )}
        </ul>
      </div>
      {!userId ? (
        <LinkLogin
          to={pathname}
          className="w-24 rounded border-2 border-green-500 text-center font-bold text-green-500"
          onClick={() => dispatch(setToggle(false))}
        >
          로그인
        </LinkLogin>
      ) : (
        <span
          onClick={() => dispatch(logout("/"))}
          className="w-fit text-sm text-gray-500"
        >
          로그아웃
        </span>
      )}
    </div>
  );
};

export default React.memo(NavMobile);
