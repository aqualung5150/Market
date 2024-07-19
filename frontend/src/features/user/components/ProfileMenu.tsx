import { Link } from "react-router-dom";

const ProfileMenu = () => {
  return (
    <div className="hidden h-full w-1/4 flex-col truncate border-r bg-white p-10 lg:flex">
      <h2 className="py-2 text-2xl font-bold">
        <Link to="">마이페이지</Link>
      </h2>
      <h3 className="py-2 text-xl font-bold">거래정보</h3>
      <ul>
        <li className="py-1">판매내역</li>
        <li className="py-1">찜한 상품</li>
      </ul>
      <h3 className="py-2 text-xl font-bold">내 정보</h3>
      <ul>
        <li className="py-1">
          <Link to="edit">정보 수정</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
