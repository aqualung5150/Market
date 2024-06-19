import styles from "./Button.module.css";

const Button = ({ text, type, onClick }: ButtonProps) => {
  return (
    // <button className={styles.button} type={type} onClick={onClick}>
    <button
      className="p-2 bg-slate-500 rounded-md text-xl"
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
