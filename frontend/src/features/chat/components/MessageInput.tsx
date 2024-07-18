import { ReactComponent as SendIcon } from "assets/send.svg";
import { MessageInputProps } from "types/chat";

const MessageInput = ({
  value,
  onChange,
  disabled = false,
}: MessageInputProps) => {
  return (
    <div className="flex w-full items-center gap-3 bg-gray-100 p-3">
      <input
        disabled={disabled}
        className="w-full rounded border p-2"
        placeholder={
          disabled ? "상대방과 대화가 불가능합니다." : "메세지를 입력하세요."
        }
        value={value}
        onChange={onChange}
      />
      <button disabled={disabled} type="submit" className="h-9 w-9">
        <SendIcon className="h-9 w-9 stroke-sky-400" />
      </button>
    </div>
  );
};

export default MessageInput;
