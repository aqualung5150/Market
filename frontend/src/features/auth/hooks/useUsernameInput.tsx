import { useCallback, useState } from "react";

const useUsernameInput = (
  validations: SignUpValidation,
  setValidations: React.Dispatch<React.SetStateAction<SignUpValidation>>,
) => {
  const [value, setValue] = useState("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    validations.username = value.length > 20 || value.length < 2 ? -1 : 1;

    setValue(e.target.value);
    setValidations(validations);
  }, []);

  return { value, onChange };
};

export default useUsernameInput;
