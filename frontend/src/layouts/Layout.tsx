import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>{children || <Outlet />}</div>
      <Footer />
    </div>
  );
};

export default Layout;
