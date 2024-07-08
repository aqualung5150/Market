import { useCallback, useState } from "react";

const useConfirmPasswordInput = (
  password: string,
  setValidations: React.Dispatch<React.SetStateAction<SignUpValidation>>,
) => {
  const [value, setValue] = useState("");

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      const confirmPassword = input === password ? 1 : -1;
      setValue(input);
      setValidations((prev) => ({ ...prev, confirmPassword: confirmPassword }));
    },
    [password],
  );
  return { value, onChange };
};

export default useConfirmPasswordInput;
