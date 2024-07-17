import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div className="h-full w-1/4 border-r p-5">
      <h1 className="pb-5 font-bold text-green-500">
        <Link to="">관리자 페이지</Link>
      </h1>
      <ul className="flex flex-col gap-5 text-2xl">
        <li className="pointer-cursor">
          <Link to="users">Users</Link>
        </li>
        <li>
          <Link to="products">Products</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
