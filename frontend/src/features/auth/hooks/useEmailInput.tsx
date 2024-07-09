import { useCallback, useState } from "react";
import axios from "axios";
import debounce from "utils/debounce";

const useEmailInput = (
  setValidations: React.Dispatch<React.SetStateAction<SignUpValidation>>,
) => {
  const [value, setValue] = useState("");

  const emailCheck = useCallback(async (email: string) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/signUp/available`,
      { email: email },
    );
    const emailUnique = res.data.success ? 1 : -1;
    setValidations((prev) => ({ ...prev, emailUnique: emailUnique }));
  }, []);

  const debounceEmailCheck = useCallback(debounce(emailCheck, 300), []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    const emailForm = input.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) ? 1 : -1;

    debounceEmailCheck(input);

    setValue(input);
    setValidations((prev) => ({
      ...prev,
      emailForm: emailForm,
      emailUnique: 0,
    }));
  }, []);

  return { value, onChange };
};

export default useEmailInput;
