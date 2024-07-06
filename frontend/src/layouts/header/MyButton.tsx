import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { useRef, useState } from "react";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";

const Mybutton = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const userNickname = useSelector((state: RootState) => state.user.nickname);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useClickOutside(wrapper, () => setOpen(false));

  return (
    <div ref={wrapper} className="relative h-full">
      <div
        className="flex h-10 w-[100px] flex-col items-center justify-center rounded bg-sky-100 font-bold"
        onClick={() => setOpen(!open)}
      >
        {userNickname}
      </div>
      {open && (
        <div className="absolute right-0 top-full my-1 w-[100px] rounded border bg-white shadow">
          <ul className="flex h-[150px] flex-col justify-center">
            <Link
              className="flex flex-1 items-center justify-center border-b"
              to={`users/${userId}`}
              onClick={() => setOpen(false)}
            >
              마이페이지
            </Link>
            <li
              className="flex flex-1 items-center justify-center"
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

export default Mybutton;
