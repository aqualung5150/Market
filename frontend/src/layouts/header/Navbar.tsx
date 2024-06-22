import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
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
        <li>
          <Link to={`/users/${user.id}`}>마이페이지</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
