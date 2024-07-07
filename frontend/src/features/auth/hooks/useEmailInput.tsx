import { useCallback, useState } from "react";

const useEmailInput = (
  validations: SignUpValidation,
  setValidations: React.Dispatch<React.SetStateAction<SignUpValidation>>,
) => {
  const [value, setValue] = useState("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // validate
    validations.email = value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
      ? 1
      : -1;

    setValue(e.target.value);
    setValidations(validations);
  }, []);

  return { value, onChange };
};

export default useEmailInput;
