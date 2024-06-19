import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Navbar = () => {
  return (
    // <nav className={styles.nav}>
    <nav className="flex w-full justify-center items-center font-semibold text-xl">
      <ul className="flex w-3/4 justify-between">
        <li className="flex justify-center">
          <Link to="/dummy">Dummy</Link>
        </li>
        <li>
          <Link to="/foo">Foo</Link>
        </li>
        <li>메뉴3</li>
        <li className="flex justify-center align-middle text-justify">메뉴3</li>
        <li>메뉴3</li>
        <li>메뉴3</li>
        <li>메뉴3</li>
      </ul>
    </nav>
  );
};

export default Navbar;
