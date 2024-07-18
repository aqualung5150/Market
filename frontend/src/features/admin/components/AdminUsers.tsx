import NotFound from "components/NotFound";
import { axiosInstance } from "data/axiosInstance";
import ProductsPagination from "features/product/components/search/ProductsPagination";
import useAxios from "hooks/useAxios";
import useFormInput from "hooks/useFormInput";
import { useCallback, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PublicUser, UsersData } from "types/user";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  //fetch
  const url =
    "users" + (searchParams.size ? "?" + searchParams.toString() : "");
  const { pathname, search } = useLocation();
  const { data, error, loading } = useAxios<UsersData>(url);
  const [selected, setSelected] = useState<number[]>([]);

  const { inputProps: email, setValue: setEmail } = useFormInput();
  const { inputProps: id, setValue: setId } = useFormInput();
  const { inputProps: nickname, setValue: setNickname } = useFormInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.value) searchParams.set("email", email.value);
    else searchParams.delete("email");
    if (id.value) searchParams.set("id", id.value);
    else searchParams.delete("id");
    if (nickname.value) searchParams.set("nickname", nickname.value);
    else searchParams.delete("nickname");

    setSearchParams(searchParams);
  };

  const reset = () => {
    searchParams.delete("email");
    searchParams.delete("id");
    searchParams.delete("nickname");

    setEmail("");
    setId("");
    setNickname("");

    setSearchParams(searchParams);
  };

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

  console.log(selected);

  if (error) return <NotFound title="정보를 불러올 수 없습니다." />;

  return (
    <div className="flex h-full w-full flex-col gap-5 overflow-auto p-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex w-96 items-center justify-between">
          <label htmlFor="email">Email</label>
          <input className="w-72 rounded border p-2" id="email" {...email} />
        </div>
        <div className="flex w-96 items-center justify-between">
          <label htmlFor="id">ID</label>
          <input className="w-72 rounded border p-2" id="id" {...id} />
        </div>

        <div className="flex w-96 items-center justify-between">
          <label htmlFor="nickname">Nickname</label>
          <input
            className="w-72 rounded border p-2"
            id="nickname"
            {...nickname}
          />
        </div>
        <div className="flex gap-5">
          <button className="h-[50px] w-[180px] rounded bg-black font-semibold text-white">
            검색
          </button>
          <button
            onClick={() => reset()}
            type="button"
            className="h-[50px] w-[180px] rounded border font-semibold"
          >
            초기화
          </button>
        </div>
      </form>
      <div className="flex items-center justify-end gap-10">
        <button
          onClick={deleteUsers}
          className="h-14 w-32 rounded bg-red-500 font-semibold text-white"
        >
          삭제
        </button>
      </div>
      {data && data.users.length > 0 ? (
        <>
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
            totalSize={data?.totalSize}
            displaySize={10}
            interval={10}
            {...{ searchParams, setSearchParams }}
          />
        </>
      ) : (
        <NotFound title="유저 정보를 찾을 수 없습니다." />
      )}
    </div>
  );
};
export default AdminUsers;
