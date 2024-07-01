import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Callback from "../pages/Callback";
import Layout from "../layouts/Layout";
import Dummy from "../pages/Dummy";
import Foo from "../pages/Foo";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
import { axiosInstance } from "../data/axiosInstance";
import useConnect from "../features/auth/hooks/useConnect";
import { SocketContext } from "../context/SocketContext";
import Users from "../pages/Users";
import Profile from "../features/user/components/Profile";
import EditProfile from "../features/user/components/EditProfile";
import ProductForm from "../features/product/components/form/ProductForm";
import Product from "../pages/Product";
import Products from "../pages/Products";

const App = () => {
  useAxiosInterceptor(axiosInstance);
  const socket = useConnect();
  // useAuthCheck();

  return (
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="dummy" element={<Dummy />} />
            <Route path="foo" element={<Foo />} />
            <Route path="users/:id" element={<Users />}>
              <Route path="" element={<Profile />} />
              <Route path="edit" element={<EditProfile />} />
            </Route>
            <Route path="product">
              <Route path={"form"} element={<ProductForm />} />
              <Route path={":id"} element={<Product />} />
            </Route>
            <Route path={"search"} element={<Products />}>
              <Route path={":title"} element={<Products />} />
            </Route>
          </Route>
          <Route path="callback" element={<Callback />} />
        </Routes>
      </SocketContext.Provider>
    </BrowserRouter>
  );
};

export default App;
