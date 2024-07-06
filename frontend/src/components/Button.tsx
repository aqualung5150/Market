const Button = ({ text, type, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className="rounded-md bg-slate-300 p-3 text-xl"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
