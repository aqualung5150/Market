import Logo from "./Logo";
import Navbar from "./Navbar";
import LoginButton from "./LoginButton";
import styles from "./Header.module.css";

const Header = () => {
  return (
    // <header className={styles.header}>
    <header className="flex align-middle justify-between w-full h-[100px] min-h-[100px] px-5 py-5 border-b bg-white">
      <Logo />
      <Navbar />
      <LoginButton />
    </header>
  );
};

export default Header;
