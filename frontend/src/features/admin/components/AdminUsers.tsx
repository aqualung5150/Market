import UsersTable from "./UsersTable";
import SearchUsersTable from "./SearchUsersTable";

const AdminUsers = () => {
  return (
    <div className="flex h-full w-full flex-col gap-5 overflow-auto p-5">
      <SearchUsersTable />
      <UsersTable />
    </div>
  );
};
export default AdminUsers;
