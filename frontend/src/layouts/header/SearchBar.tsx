import Input from "components/Input";
import { setToggle } from "layouts/menuSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const dispatch = useDispatch();

  return (
    <div className="items-left mr-3 flex w-full justify-start">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onEnter={() => {
          dispatch(setToggle(false));
          navigate(`/search/${value}`);
        }}
        placeholder="어떤 상품을 찾으시나요?"
      ></Input>
    </div>
  );
};

export default SearchBar;
