const Input = ({
  value,
  placeholder,
  onChange,
  onEnter,
  disabled,
}: InputProps) => {
  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // isComposing 한글입력에서 함수가 두 번 실행되는 것을 방지
      if (e.nativeEvent.isComposing) return;
      if (onEnter) onEnter();
    }
  };
  return (
    <input
      className="w-full border rounded px-2 py-2"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={activeEnter}
      disabled={disabled}
    />
  );
};

export default Input;
