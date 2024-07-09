import { useState } from "react";

const useFormInput = (initialValue: string = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const inputProps = { value, onChange };
  return { inputProps, setValue };
};

export default useFormInput;
