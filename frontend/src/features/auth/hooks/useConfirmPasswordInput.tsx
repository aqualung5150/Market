import { useCallback, useState } from "react";

const useConfirmPasswordInput = (
  password: string,
  validations: SignUpValidation,
  setValidations: React.Dispatch<React.SetStateAction<SignUpValidation>>,
) => {
  const [value, setValue] = useState("");

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      validations.confirmPassword = value === password ? 1 : -1;
      setValue(e.target.value);
      setValidations(validations);
    },
    [password],
  );

  return { value, onChange };
};

export default useConfirmPasswordInput;
