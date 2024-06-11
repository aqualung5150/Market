import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/dummy">Dummy</Link>
        </li>
        <li>
          <Link to="/foo">Foo</Link>
        </li>
        <li>메뉴3</li>
        <li>메뉴3</li>
        <li>메뉴3</li>
        <li>메뉴3</li>
        <li>메뉴3</li>
      </ul>
    </nav>
  );
};

export default Navbar;
