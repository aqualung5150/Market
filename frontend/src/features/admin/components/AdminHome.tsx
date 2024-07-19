import { ReactComponent as AdminIcon } from "assets/admin.svg";

const AdminHome = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 font-bold">
      <AdminIcon className="h-[280px] w-[280px]" />
      <h1>관리자 페이지입니다.</h1>
    </div>
  );
};

export default AdminHome;
