import Logo from "./Logo";
import Navbar from "./Navbar";
import LoginButton from "./LoginButton";
import styles from "../../styles/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Navbar />
      <LoginButton />
    </header>
  );
};

export default Header;
