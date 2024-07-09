import { useState } from "react";
import { ReactComponent as CloseIcon } from "../assets/close.svg";

const SnsSignUp = () => {
  const [validation, setValidations] = useState(0);
  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(e.target.value);
    setValidations(value.length > 12 || value.length < 2 ? -1 : 1);
  };

  return (
    <div className="w-80">
      <label className="mb-2 block" htmlFor="nickname">
        Nickname
      </label>
      <input
        id="nickname"
        type="text"
        placeholder="Nickname"
        className="h-14 w-full rounded border p-4 shadow"
        value={value}
        onChange={onChange}
      />
      {validation === -1 && (
        <div className="flex items-center gap-1 stroke-red-500 text-sm text-red-500">
          <CloseIcon className="h-4 w-4" />
          <p>최소 2자~12자 이하로 입력해 주세요.</p>
        </div>
      )}
    </div>
  );
};

export default SnsSignUp;
