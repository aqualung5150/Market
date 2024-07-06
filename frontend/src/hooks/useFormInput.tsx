import { useState } from "react";

const useFormInput = (initialValue: string = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { value, setValue, onChange };
};

export default useFormInput;
