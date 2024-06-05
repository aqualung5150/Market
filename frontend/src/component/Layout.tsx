import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      {children || <Outlet />}
      <Footer />
    </div>
  );
};

export default Layout;
