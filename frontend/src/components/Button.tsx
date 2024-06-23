import styles from "./Button.module.css";

const Button = ({ text, type, onClick, disabled }: ButtonProps) => {
  return (
    // <button className={styles.button} type={type} onClick={onClick}>
    <button
      className="p-2 bg-slate-500 rounded-md text-xl"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
