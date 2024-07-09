import React from "react";
import { ReactComponent as CheckIcon } from "assets/check.svg";

const PasswordField = ({ password, validations }: any) => {
  return (
    <div className="w-80">
      <label className="m-1 block" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        className={`h-14 w-full rounded border p-4 shadow focus:outline-none ${(validations.pwdCharSet === -1 || validations.pwdLength === -1 || validations.pwdSeriesOfSameChar === -1) && "border-red-500"}`}
        {...password}
      />
      <div className="m-1 flex flex-col gap-1 stroke-gray-400 text-sm text-gray-400">
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
  );
};

export default React.memo(PasswordField);
