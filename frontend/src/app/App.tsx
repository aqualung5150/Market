import { axiosInstance } from "data/axiosInstance";
import EditProfile from "features/user/components/EditProfile";
import Profile from "features/user/components/Profile";
import useAxiosInterceptor from "hooks/useAxiosInterceptor";
import Layout from "layouts/Layout";
import Callback from "pages/Callback";
import Dummy from "pages/Dummy";
import Foo from "pages/Foo";
import Home from "pages/Home";
import Product from "pages/Product";
import ProductForm from "pages/ProductForm";
import Products from "pages/Products";
import SignUp from "pages/SignUp";
import Users from "pages/Users";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  useAxiosInterceptor(axiosInstance);
  // const socket = useConnect();
  // useAuthCheck();

  return (
    <BrowserRouter>
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
            <Route path="form" element={<ProductForm />} />
            <Route path=":id" element={<Product />} />
          </Route>
          <Route path="search" element={<Products />}>
            <Route path=":title" element={<Products />} />
          </Route>
          <Route path="/signUp" element={<SignUp />} />
        </Route>
        <Route path="callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
