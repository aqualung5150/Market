import { Link } from "react-router-dom";

const ProfileMenu = () => {
  return (
    <div className="hidden bg-white lg:flex flex-col w-1/4 h-full p-10 border-r truncate">
      <h2 className="text-2xl font-bold py-2">마이페이지</h2>
      <h3 className="text-xl font-bold py-2">거래정보</h3>
      <ul>
        <li className="py-1">판매내역</li>
        <li className="py-1">찜한 상품</li>
      </ul>
      <h3 className="text-xl font-bold py-2">내 정보</h3>
      <ul>
        <li className="py-1">
          <Link to="edit">정보 수정</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
