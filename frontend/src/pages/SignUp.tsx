import { useCallback, useState } from "react";
import { ReactComponent as CheckIcon } from "../assets/check.svg";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import usePasswordInput from "../features/auth/hooks/usePasswordInput";
import useEmailInput from "../features/auth/hooks/useEmailInput";
import useConfirmPasswordInput from "../features/auth/hooks/useConfirmPasswordInput";
import useUsernameInput from "../features/auth/hooks/useUsernameInput";
import useNicknameInput from "../features/auth/hooks/useNicknameInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [validations, setValidations] = useState<SignUpValidation>({
    // username: 0,
    nickname: 0,
    email: 0,
    pwdCharSet: 0,
    pwdLength: 0,
    pwdSeriesOfSameChar: 0,
    confirmPassword: 0,
  });
  const email = useEmailInput(validations, setValidations);
  const password = usePasswordInput(validations, setValidations);
  const confirmPassword = useConfirmPasswordInput(
    password.value,
    validations,
    setValidations,
  );
  // const username = useUsernameInput(validations, setValidations);
  const nickname = useNicknameInput(validations, setValidations);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;
    let key: keyof SignUpValidation;
    for (key in validations) {
      if (validations[key] !== 1) {
        console.log(key);
        validations[key] = -1;
        isValid = false;
      }
    }

    if (isValid) {
      console.log("Valid!!");
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/signUp`, {
          email: email.value,
          password: password.value,
          nickname: nickname.value,
        });
        alert("회원가입에 성공했습니다.");
        navigate("/");
      } catch (err) {
        alert("회원가입에 실패했습니다.");
      }
    } else {
      console.log("Invalid...");
      setValidations({ ...validations });
    }
  };
  return (
    <form
      className="flex h-full w-full flex-col items-center gap-10 bg-white p-10"
      onSubmit={handleSubmit}
    >
      <div className="w-80">
        <label className="mb-2 block" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="h-14 w-full rounded border p-4 shadow"
          {...email}
        />
        <div className="p-1">
          {validations.email === -1 && (
            <div className="flex items-center gap-1 stroke-red-500 text-sm text-red-500">
              <CloseIcon className="h-4 w-4" />
              <p>이메일 형식이 올바르지 않습니다.</p>
            </div>
          )}
          {/* {errors.email === -1 && (
            <CheckIcon className="h-4 w-4 stroke-green-500" />
          )} */}
        </div>
      </div>
      <div className="w-80">
        <label className="mb-2 block" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="h-14 w-full rounded border p-4 shadow"
          {...password}
        />
        <div className="flex flex-col gap-1 stroke-gray-400 p-1 text-sm text-gray-400">
          <div
            className={`flex items-center gap-1 ${validations.pwdCharSet !== 0 && (validations.pwdCharSet === -1 ? "stroke-red-500 text-red-500" : "stroke-green-500 text-green-500")}`}
          >
            <CheckIcon className="h-4 w-4" />
            <p>영문/숫자/특수문자 중, 2가지 이상 포함</p>
          </div>
          <div
            className={`flex items-center gap-1 ${validations.pwdLength !== 0 && (validations.pwdLength === -1 ? "stroke-red-500 text-red-500" : "stroke-green-500 text-green-500")}`}
          >
            <CheckIcon className="h-4 w-4" />
            <p>8자 이상 16자 이하 입력 (공백 제외)</p>
          </div>
          <div
            className={`flex items-center gap-1 ${validations.pwdSeriesOfSameChar !== 0 && (validations.pwdSeriesOfSameChar === -1 ? "stroke-red-500 text-red-500" : "stroke-green-500 text-green-500")}`}
          >
            <CheckIcon className="h-4 w-4" />
            <p>연속 3자 이상 동일한 문자/숫자 제외</p>
          </div>
        </div>
      </div>
      <div className="w-80">
        <label className="mb-2 block" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="h-14 w-full rounded border p-4 shadow"
          {...confirmPassword}
          // value={confirmPassword.value}
          // onChange={handleConfirmChange}
        />
        {validations.confirmPassword === -1 && (
          <div className="flex items-center gap-1 stroke-red-500 text-sm text-red-500">
            <CloseIcon className="h-4 w-4" />
            <p>비밀번호가 일치하지 않습니다.</p>
          </div>
        )}
      </div>
      {/* <div className="w-80">
        <label className="mb-2 block" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="h-14 w-full rounded border p-4 shadow"
          {...username}
        />
        {validations.username === -1 && (
          <div className="flex items-center gap-1 stroke-red-500 text-sm text-red-500">
            <CloseIcon className="h-4 w-4" />
            <p>최소 2자~20자 이하로 입력해 주세요.</p>
          </div>
        )}
      </div> */}
      <div className="w-80">
        <label className="mb-2 block" htmlFor="nickname">
          Nickname
        </label>
        <input
          id="nickname"
          type="text"
          placeholder="Nickname"
          className="h-14 w-full rounded border p-4 shadow"
          {...nickname}
        />
        {validations.nickname === -1 && (
          <div className="flex items-center gap-1 stroke-red-500 text-sm text-red-500">
            <CloseIcon className="h-4 w-4" />
            <p>최소 2자~12자 이하로 입력해 주세요.</p>
          </div>
        )}
      </div>
      <button
        className="mb-2 h-14 w-[120px] rounded-md bg-green-500 text-base font-semibold text-white"
        type="submit"
      >
        등록
      </button>
    </form>
  );
};

export default SignUp;
