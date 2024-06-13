interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}
