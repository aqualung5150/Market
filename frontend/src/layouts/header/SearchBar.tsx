import { useState } from "react";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");

  return (
    <div className="flex justify-center items-center w-[400px] mr-3">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onEnter={() => navigate(`/search/${value}`)}
        placeholder="어떤 상품을 찾으시나요?"
      ></Input>
    </div>
  );
};

export default SearchBar;
