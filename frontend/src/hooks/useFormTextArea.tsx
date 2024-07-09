import React, { useState } from "react";

const useFormTextArea = (initialValue: string = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const inputProps = { value, onChange };
  return { inputProps, setValue };
};

export default useFormTextArea;
