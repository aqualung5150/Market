import useFormInput from "hooks/useFormInput";
import { useSearchParams } from "react-router-dom";

const SearchUsersTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  return (
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
  );
};

export default SearchUsersTable;
