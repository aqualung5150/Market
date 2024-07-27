import { setToggle } from "layouts/menuSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "assets/search.svg";
import useFormInput from "hooks/useFormInput";

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { inputProps: searchInput, setValue: setSearchValue } = useFormInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue("");
    dispatch(setToggle(false));
    navigate(`/search/${searchInput.value}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
      <button>
        <SearchIcon className="h-10 w-10 stroke-gray-500" />
      </button>
      <input
        className="w-full rounded border p-2 outline-none"
        placeholder="어떤 상품을 찾으시나요?"
        {...searchInput}
      />
    </form>
  );
};

export default SearchBar;
