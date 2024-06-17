const Input = ({ value, placeholder, onChange, onEnter }: InputProps) => {
  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // isComposing 한글입력에서 함수가 두 번 실행되는 것을 방지
      if (e.nativeEvent.isComposing) return;
      onEnter();
    }
  };
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={activeEnter}
    />
  );
};

export default Input;
