import { useCallback, useState } from "react";

const useNicknameInput = (
  validations: SignUpValidation,
  setValidations: React.Dispatch<React.SetStateAction<SignUpValidation>>,
) => {
  const [value, setValue] = useState("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    validations.nickname = value.length > 12 || value.length < 2 ? -1 : 1;

    setValue(e.target.value);
    setValidations(validations);
  }, []);

  return { value, onChange };
};

export default useNicknameInput;
