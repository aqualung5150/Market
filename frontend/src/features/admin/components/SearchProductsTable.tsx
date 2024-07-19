import useFormInput from "hooks/useFormInput";
import { useSearchParams } from "react-router-dom";

const SearchProductsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { inputProps: title, setValue: setTitle } = useFormInput();
  const { inputProps: id, setValue: setId } = useFormInput();
  const { inputProps: userId, setValue: setUserId } = useFormInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.value) searchParams.set("keyword", title.value);
    else searchParams.delete("keyword");
    if (id.value) searchParams.set("id", id.value);
    else searchParams.delete("id");
    if (userId.value) searchParams.set("userId", userId.value);
    else searchParams.delete("userId");

    setSearchParams(searchParams);
  };

  const reset = () => {
    searchParams.delete("keyword");
    searchParams.delete("id");

    setTitle("");
    setId("");
    setUserId("");

    setSearchParams(searchParams);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex w-96 items-center justify-between">
        <label htmlFor="title">Title</label>
        <input className="w-72 rounded border p-2" id="title" {...title} />
      </div>
      <div className="flex w-96 items-center justify-between">
        <label htmlFor="id">ID</label>
        <input className="w-72 rounded border p-2" id="id" {...id} />
      </div>
      <div className="flex w-96 items-center justify-between">
        <label htmlFor="userId">User ID</label>
        <input className="w-72 rounded border p-2" id="userId" {...userId} />
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

export default SearchProductsTable;
