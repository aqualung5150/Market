import { useCallback, useState } from "react";

const usePasswordInput = (
  validations: SignUpValidation,
  setValidations: React.Dispatch<React.SetStateAction<SignUpValidation>>,
) => {
  const [value, setValue] = useState("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length !== 0) {
      validations.pwdCharSet = value.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{0,}$/,
      )
        ? 1
        : -1;

      validations.pwdLength = value.length < 8 || value.length > 16 ? -1 : 1;

      validations.pwdSeriesOfSameChar = 1;
      for (let i = 0; i < value.length - 2; ++i) {
        if (value[i] === value[i + 1] && value[i + 1] === value[i + 2]) {
          validations.pwdSeriesOfSameChar = -1;
        }
      }
    } else {
      validations.pwdCharSet = 0;
      validations.pwdLength = 0;
      validations.pwdSeriesOfSameChar = 0;
    }

    setValue(e.target.value);
    setValidations(validations);
  }, []);

  return { value, onChange };
};

export default usePasswordInput;
