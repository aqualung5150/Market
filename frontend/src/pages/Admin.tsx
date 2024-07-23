import { RootState } from "app/store";
import Loading from "components/Loading";
import AdminSideBar from "features/admin/components/AdminSideBar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state: RootState) => state.user.id);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId || userId !== 1) {
      navigate("/");
      alert("관리자 외에는 접근이 불가합니다.");
    } else setLoading(false);
  }, [userId]);
  if (loading) return <Loading text="로딩중..." />;
  return (
    <div className="flex h-dvh w-dvw">
      <AdminSideBar />
      <div className="h-full flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
