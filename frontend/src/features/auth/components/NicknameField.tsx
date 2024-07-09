import { ReactComponent as CloseIcon } from "assets/close.svg";
import React from "react";

const NicknameField = ({ nickname, validations }: any) => {
  return (
    <div className="w-80">
      <label className="m-1 block" htmlFor="nickname">
        Nickname
      </label>
      <input
        id="nickname"
        type="text"
        placeholder="Nickname"
        className={`h-14 w-full rounded border p-4 shadow focus:outline-none ${validations.nickname === -1 && "border-red-500"}`}
        {...nickname}
      />
      {validations.nickname === -1 && (
        <div className="m-1 flex items-center gap-1 stroke-red-500 text-sm text-red-500">
          <CloseIcon className="h-4 w-4" />
          <p>최소 2자~12자 이하로 입력해 주세요.</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(NicknameField);
