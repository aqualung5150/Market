import { RootState } from "app/store";
import { logout } from "features/user/userSlice";
import useClickOutside from "hooks/useClickOutside";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Mybutton = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const userImage = useSelector((state: RootState) => state.user.image);
  // const userNickname = useSelector((state: RootState) => state.user.nickname);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useClickOutside(wrapper, () => setOpen(false));

  return (
    <div ref={wrapper} className="relative h-full">
      <div
        className="aspect-square w-12 rounded-full"
        onClick={() => setOpen(!open)}
      >
        <img
          className="aspect-square rounded-full object-cover"
          src={`${process.env.REACT_APP_API_URL}/users/profileImage/${userImage}`}
        />
      </div>
      {open && (
        <div className="absolute right-0 top-full my-1 w-24 rounded border bg-white shadow">
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
