import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import SearchBar from "./SearchBar";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as AngleDownIcon } from "../../assets/angleDown.svg";
import { ReactComponent as SendIcon } from "../../assets/send.svg";
import categoryData from "../../features/product/data/category.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../features/user/userSlice";
import useNavLogin from "../../features/auth/hooks/useNavLogin";
import { setOpenChat } from "../../features/chat/chatSlice";

const NavMobile = ({ handleCloseMenu }: any) => {
  const { pathname } = useLocation();
  const userId = useSelector((state: RootState) => state.user.id);
  const toggle = useSelector((state: RootState) => state.menu.toggle);
  const [openCategory, setOpenCategory] = useState(false);
  const [openMypage, setOpenMypage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navLogin = useNavLogin();
  const noti = useSelector((state: RootState) => state.chat.noti);

  useEffect(() => {
    if (!toggle) {
      setOpenCategory(false);
      setOpenMypage(false);
    }
  }, [toggle]);

  return (
    <div
      className={`fixed p-4 flex lg:hidden flex-col gap-4 left-0 w-full bg-white duration-500 text-lg ${
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
            <div
              onClick={() => {
                handleCloseMenu();
                navigate("/search");
              }}
            >
              구매하기
            </div>
            <AngleDownIcon
              onClick={() => setOpenCategory(!openCategory)}
              className="w-7 h-7"
            />
          </li>
          {openCategory && (
            <ul>
              {Object.values(categoryData).map((category) => (
                <li
                  key={category.id}
                  onClick={() => {
                    handleCloseMenu();
                    navigate(`/search?category=${category.id}`);
                  }}
                >
                  - {category.label}
                </li>
              ))}
            </ul>
          )}
        </ul>
      </div>
      <div
        className="text-xl font-semibold w-fit"
        onClick={() => {
          handleCloseMenu();
          navLogin("/product/form");
        }}
      >
        <span>판매하기</span>
      </div>
      {userId && (
        <>
          <div>
            <ul className="flex flex-1 flex-col gap-1">
              <li className="text-xl font-semibold flex justify-between items-center">
                <div
                  onClick={() => {
                    handleCloseMenu();
                    navigate(`/users/${userId}`);
                  }}
                >
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
                  <li
                    onClick={() => {
                      handleCloseMenu();
                      navigate(`/users/${userId}/edit`);
                    }}
                  >
                    - 정보 수정
                  </li>
                </ul>
              )}
            </ul>
          </div>
          <div
            className="text-xl font-semibold gap-1 flex w-fit items-center"
            onClick={() => {
              handleCloseMenu();
              dispatch(setOpenChat(true));
            }}
          >
            {noti && <p className="w-4 h-4 mr-1 rounded-full bg-red-500" />}
            <span>채팅하기</span>
            <SendIcon className="w-7 h-7 stroke-sky-300" />
          </div>
        </>
      )}

      {!userId ? (
        <div
          onClick={() => navLogin(pathname)}
          className="text-green-500 text-center font-bold w-24 border-2 border-green-500 rounded"
        >
          로그인
        </div>
      ) : (
        <span
          onClick={() => dispatch(logout("/"))}
          className="text-sm text-gray-600 w-fit"
        >
          로그아웃
        </span>
      )}
    </div>
  );
};

export default NavMobile;
