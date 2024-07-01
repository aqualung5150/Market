import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";

const Dropdown = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const userNickname = useSelector((state: RootState) => state.user.nickname);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useClickOutside(wrapper, () => setOpen(false));

  return (
    <div ref={wrapper} className="relative h-full">
      <div
        className="rounded bg-sky-100 font-bold flex flex-col justify-center items-center w-[100px] h-10 truncate"
        onClick={() => setOpen(!open)}
      >
        {userNickname}
      </div>
      {open && (
        <div className="absolute border my-1 rounded bg-white w-[100px] top-full right-0 shadow">
          <ul className="flex flex-col justify-center h-[150px]">
            <li
              className="flex flex-1 justify-center items-center border-b"
              onClick={() => {
                setOpen(false);
                navigate(`users/${userId}`);
              }}
            >
              마이페이지
            </li>
            <li
              className="flex flex-1 justify-center items-center"
              onClick={() => {
                setOpen(false);
                dispatch(logout("/"));
              }}
            >
              로그아웃
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
