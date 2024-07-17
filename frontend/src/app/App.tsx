import NotFound from "components/NotFound";
import { axiosInstance } from "data/axiosInstance";
import AdminProducts from "features/admin/components/AdminProducts";
import AdminUsers from "features/admin/components/AdminUsers";
import EditProfile from "features/user/components/EditProfile";
import Profile from "features/user/components/Profile";
import useAxiosInterceptor from "hooks/useAxiosInterceptor";
import Layout from "layouts/Layout";
import Admin from "pages/Admin";
import Callback from "pages/Callback";
import Home from "pages/Home";
import Product from "pages/Product";
import ProductForm from "pages/ProductForm";
import Products from "pages/Products";
import SignUp from "pages/SignUp";
import Users from "pages/Users";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  useAxiosInterceptor(axiosInstance);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="users/:id" element={<Users />}>
            <Route path="" element={<Profile />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
          <Route path="product">
            <Route path="form" element={<ProductForm />} />
            <Route path=":id" element={<Product />} />
          </Route>
          <Route path="search" element={<Products />}>
            <Route path=":keyword" element={<Products />} />
          </Route>
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="*"
            element={<NotFound title="페이지를 찾을 수 없습니다." />}
          />
        </Route>
        <Route path="callback" element={<Callback />} />
        <Route path="admin" element={<Admin />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
