import NotFound from "components/NotFound";
import useAxios from "hooks/useAxios";
import useFormInput from "hooks/useFormInput";
import { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PublicUser } from "types/user";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  //fetch
  const url =
    "users" + (searchParams.size ? "?" + searchParams.toString() : "");
  const { data, error, loading } = useAxios<PublicUser[]>(url);
  const [selected, setSelected] = useState<number[]>([]);

  const { inputProps: email } = useFormInput();
  const { inputProps: id } = useFormInput();
  const { inputProps: nickname } = useFormInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.value) searchParams.set("email", email.value);
    if (id.value) searchParams.set("id", id.value);
    if (nickname.value) searchParams.set("nickname", nickname.value);

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
    if (e.target.checked) setSelected(data?.map((user) => user.id));
    else setSelected([]);
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
        <button className="h-[50px] w-[200px] rounded bg-black font-semibold text-white">
          검색
        </button>
      </form>
      {data && (
        <table className="data-grid w-full">
          <tbody>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selected.length === data.length}
                  onChange={(e) => checkAll(e)}
                />
              </th>
              {Object.keys(data[0]).map((e, idx) => (
                <th key={idx}>{e}</th>
              ))}
            </tr>
            {data.map((user) => (
              <tr
                className="cursor-pointer"
                key={user.id}
                onClick={() => navigate(`${user.id}`)}
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
                {Object.values(user).map((e, idx) => (
                  <td key={idx}>{e}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default AdminUsers;
