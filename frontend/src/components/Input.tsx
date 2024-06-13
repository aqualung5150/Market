const Input = ({ value, placeholder, onChange, onEnter }: InputProps) => {
  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onEnter();
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
