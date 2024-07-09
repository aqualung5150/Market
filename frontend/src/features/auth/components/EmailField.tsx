import React from "react";
import { ReactComponent as CloseIcon } from "assets/close.svg";

const EmailField = ({ email, validations }: any) => {
  return (
    <div className="w-80">
      <label className="m-1 block" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        className={`h-14 w-full rounded border p-4 shadow focus:outline-none ${(validations.emailForm === -1 || validations.emailUnique === -1) && "border-red-500"}`}
        {...email}
      />
      <div className="m-1">
        {validations.emailForm === -1 && (
          <div className="flex items-center gap-1 stroke-red-500 text-sm text-red-500">
            <CloseIcon className="h-4 w-4" />
            <p>이메일 형식이 올바르지 않습니다.</p>
          </div>
        )}
        {validations.emailUnique === -1 && (
          <div className="flex items-center gap-1 stroke-red-500 text-sm text-red-500">
            <CloseIcon className="h-4 w-4" />
            <p>이미 가입한 계정이 있습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(EmailField);
