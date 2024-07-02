import { useState } from "react";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToggle } from "../menuSlice";

const SearchBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const dispatch = useDispatch();

  return (
    <div className="flex justify-start items-left w-full mr-3">
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
