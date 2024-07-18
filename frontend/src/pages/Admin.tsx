import { RootState } from "app/store";
import AdminSideBar from "features/admin/components/AdminSideBar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Admin = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId || userId !== 1) {
      navigate("/");
      alert("관리자 외에는 접근이 불가합니다.");
    }
  }, [userId]);
  return (
    <div className="flex h-screen w-screen">
      <AdminSideBar />
      <div className="h-full flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
