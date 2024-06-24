const Button = ({ text, type, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className="p-3 bg-slate-300 rounded-md text-xl"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
