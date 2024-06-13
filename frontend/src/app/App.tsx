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
import useAuthCheck from "../features/auth/hooks/useAuthCheck";

const App = () => {
  useAxiosInterceptor(axiosInstance);
  // const socket = useConnect();
  useAuthCheck();

  return (
    <BrowserRouter>
      {/* <SocketContext.Provider value={socket}> */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dummy" element={<Dummy />} />
          <Route path="/foo" element={<Foo />} />
        </Route>
        <Route path="/callback" element={<Callback />} />
      </Routes>
      {/* </SocketContext.Provider> */}
    </BrowserRouter>
  );
};

export default App;
