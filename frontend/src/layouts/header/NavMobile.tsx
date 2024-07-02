import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import SearchBar from "./SearchBar";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as AngleDownIcon } from "../../assets/angleDown.svg";
import categoryData from "../../features/product/data/category.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setOpenLogin } from "../../features/auth/loginSlice";
import { logout } from "../../features/user/userSlice";
import useNavLogin from "../../features/auth/hooks/useNavLogin";

const NavMobile = () => {
  const { pathname } = useLocation();
  const userId = useSelector((state: RootState) => state.user.id);
  const toggle = useSelector((state: RootState) => state.menu.toggle);
  const [openCategory, setOpenCategory] = useState(false);
  const [openMypage, setOpenMypage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navLogin = useNavLogin();

  useEffect(() => {
    if (!toggle) {
      setOpenCategory(false);
      setOpenMypage(false);
    }
  }, [toggle]);

  return (
    <div
      className={`absolute p-4 flex lg:hidden flex-col gap-4 left-0 w-full bg-white duration-300 ${
        toggle ? "top-16" : "top-[-100%]"
      }`}
    >
      <div className="w-full flex gap-2 items-center">
        <SearchIcon className="w-10 h-10" />
        <SearchBar />
      </div>
      <div>
        <ul className="flex flex-1 flex-col gap-1">
          <li className="text-xl font-semibold flex justify-between items-center">
            <div onClick={() => navigate("/search")}>구매하기</div>
            <AngleDownIcon
              onClick={() => setOpenCategory(!openCategory)}
              className="w-7 h-7"
            />
          </li>
          {openCategory && (
            <ul>
              {Object.values(categoryData).map((category) => (
                <li
                  className="text-lg"
                  key={category.id}
                  onClick={() => navigate(`/search?category=${category.id}`)}
                >
                  - {category.label}
                </li>
              ))}
            </ul>
          )}
        </ul>
      </div>
      <div className="text-xl font-semibold">
        <span onClick={() => navLogin("/product/form")}>판매하기</span>
      </div>
      <div>
        {userId && (
          <>
            <ul className="flex flex-1 flex-col gap-1">
              <li className="text-xl font-semibold flex justify-between items-center">
                <div onClick={() => navigate(`/users/${userId}`)}>
                  마이페이지
                </div>
                <AngleDownIcon
                  onClick={() => setOpenMypage(!openMypage)}
                  className="w-7 h-7"
                />
              </li>
              {openMypage && (
                <ul>
                  <li>- 판매내역</li>
                  <li>- 찜한 상품</li>
                  <li onClick={() => navigate(`/users/${userId}/edit`)}>
                    - 정보 수정
                  </li>
                </ul>
              )}
            </ul>
          </>
        )}
      </div>
      {!userId ? (
        <div
          onClick={() => navLogin(pathname)}
          className="text-green-600 text-center font-bold cursor-pointer w-24 border-2 border-green-600 rounded"
        >
          로그인
        </div>
      ) : (
        <div
          onClick={() => dispatch(logout("/"))}
          className="text-gray-600 cursor-pointer"
        >
          로그아웃
        </div>
      )}
    </div>
  );
};

export default NavMobile;
