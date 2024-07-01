import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ProfileMenu from "../features/user/components/ProfileMenu";

const Users = () => {
  const user = useSelector((state: RootState) => state.user);
  const paramId = useParams().id;

  return (
    <div className="flex w-full h-full">
      {user.id && paramId && user.id === parseInt(paramId) && <ProfileMenu />}
      <div className="flex flex-1 w-3/4">
        <Outlet />
      </div>
    </div>
  );
};

export default Users;
