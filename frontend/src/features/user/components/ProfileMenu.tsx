import { Link } from "react-router-dom";

const ProfileMenu = () => {
  return (
    <div className="hidden h-full w-1/4 flex-col truncate border-r bg-white p-10 lg:flex">
      <h1 className="border-b py-2 font-bold">
        <Link to="">마이페이지</Link>
      </h1>
      <h2 className="py-2 font-bold">내 정보</h2>
      <ul>
        <li>
          <Link to="edit">정보 수정</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
