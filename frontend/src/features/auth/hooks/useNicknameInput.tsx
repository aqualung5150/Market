import { useCallback, useState } from "react";

const useNicknameInput = (
  setValidations: React.Dispatch<React.SetStateAction<SignUpValidation>>,
) => {
  const [value, setValue] = useState("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const isValid = input.length > 12 || input.length < 2 ? -1 : 1;

    setValue(input);
    setValidations((prev) => ({ ...prev, nickname: isValid }));
  }, []);

  return { value, onChange };
};

export default useNicknameInput;
