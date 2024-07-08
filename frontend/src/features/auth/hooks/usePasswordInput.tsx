import { useCallback, useState } from "react";

const usePasswordInput = (
  setValidations: React.Dispatch<React.SetStateAction<SignUpValidation>>,
) => {
  const [value, setValue] = useState("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    let pwdCharSet = 0;
    let pwdLength = 0;
    let pwdSeriesOfSameChar = 0;
    if (input.length !== 0) {
      pwdCharSet = input.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{0,}$/,
      )
        ? 1
        : -1;

      pwdLength = input.length < 8 || input.length > 16 ? -1 : 1;

      pwdSeriesOfSameChar = 1;
      for (let i = 0; i < input.length - 2; ++i) {
        if (input[i] === input[i + 1] && input[i + 1] === input[i + 2]) {
          pwdSeriesOfSameChar = -1;
        }
      }
    }

    setValue(input);
    setValidations((prev) => ({
      ...prev,
      pwdCharSet: pwdCharSet,
      pwdLength: pwdLength,
      pwdSeriesOfSameChar: pwdSeriesOfSameChar,
    }));
  }, []);

  return { value, onChange };
};

export default usePasswordInput;
