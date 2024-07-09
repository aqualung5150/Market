import { RootState } from "app/store";
import ProfileMenu from "features/user/components/ProfileMenu";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

const Users = () => {
  const user = useSelector((state: RootState) => state.user);
  const paramId = useParams().id;

  return (
    <div className="flex h-full w-full">
      {user.id && paramId && user.id === parseInt(paramId) && <ProfileMenu />}
      <div className="flex w-3/4 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Users;
