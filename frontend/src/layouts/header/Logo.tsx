import { Link } from "react-router-dom";
import homeButton from "../../assets/home_button.png";
import styles from "./Header.module.css";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link to="/">
        <img src={homeButton} />
      </Link>
    </div>
  );
};

export default Logo;
