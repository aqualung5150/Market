import AdminSideBar from "features/admin/components/AdminSideBar";
import { Outlet } from "react-router-dom";

const Admin = () => {
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
