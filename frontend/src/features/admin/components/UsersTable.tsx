import Loading from "components/Loading";
import NotFound from "components/NotFound";
import { axiosInstance } from "data/axiosInstance";
import ProductsPagination from "features/product/components/search/ProductsPagination";
import useAxios from "hooks/useAxios";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { UsersData } from "types/user";

const UsersTable = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  //fetch
  const url =
    "users" + (searchParams.size ? "?" + searchParams.toString() : "");
  const { pathname, search } = useLocation();
  const { data, error, loading } = useAxios<UsersData>(url);
  const [selected, setSelected] = useState<number[]>([]);

  const checkSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    if (e.target.checked) setSelected((prev) => prev.concat(id));
    else setSelected((prev) => prev.filter((e) => e !== id));
  };

  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!data) return;
    if (e.target.checked) setSelected(data?.users.map((user) => user.id));
    else setSelected([]);
  };

  const deleteUsers = async () => {
    if (selected.length < 1) return;

    try {
      await axiosInstance.post("users/deleteMany", {
        users: selected,
      });
      navigate(pathname + search);
    } catch (err) {
      alert(err);
    }
  };
  if (loading) return <Loading text="로딩중..." />;
  if (error) return <NotFound title="유저 정보를 찾을 수 없습니다." />;

  if (data)
    return (
      <>
        <div className="flex items-center justify-end gap-10">
          <button
            onClick={deleteUsers}
            className="h-14 w-32 rounded bg-red-500 font-semibold text-white"
          >
            삭제
          </button>
        </div>
        <table className="data-grid w-full">
          <tbody>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selected.length === data.users.length}
                  onChange={(e) => checkAll(e)}
                />
              </th>
              {Object.keys(data.users[0]).map((e, idx) => (
                <th key={idx}>{e}</th>
              ))}
            </tr>
            {data.users.map((user) => (
              <tr
                className="cursor-pointer"
                key={user.id}
                onClick={() => navigate(`/users/${user.id}`)}
              >
                <th
                  className="cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(user.id)}
                    onChange={(e) => checkSelected(e, user.id)}
                  />
                </th>
                {Object.values(user).map((e, idx) => {
                  if (typeof e === "boolean") return <td>{e.toString()}</td>;
                  return <td key={idx}>{e}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <ProductsPagination
          totalSize={data.totalSize}
          displaySize={20}
          interval={10}
          {...{ searchParams, setSearchParams }}
        />
      </>
    );
  return null;
};

export default UsersTable;
