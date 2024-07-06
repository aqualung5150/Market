import React, { useState } from "react";

const useFormTextArea = (initialValue: string = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return { value, setValue, onChange };
};

export default useFormTextArea;
