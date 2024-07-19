import React from "react";
import { ReactComponent as CloseIcon } from "assets/close.svg";

const ConfirmPasswordField = ({ input, validations }: SignUpFieldProps) => {
  return (
    <div className="w-80">
      <label className="m-1 block" htmlFor="confirmPassword">
        Confirm Password
      </label>
      <input
        id="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        className={`h-14 w-full rounded border p-4 shadow focus:outline-none ${validations.confirmPassword === -1 && "border-red-500"}`}
        {...input}
      />
      {validations.confirmPassword === -1 && (
        <div className="m-1 flex items-center gap-1 stroke-red-500 text-sm text-red-500">
          <CloseIcon className="h-4 w-4" />
          <p>비밀번호가 일치하지 않습니다.</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(ConfirmPasswordField);
