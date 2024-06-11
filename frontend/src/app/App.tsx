import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Callback from "../pages/Callback";
import Layout from "../layouts/Layout";
import { ConnectionContext } from "../context/ConnectionContext";
import Dummy from "../pages/Dummy";
import Foo from "../pages/Foo";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
import { axiosInstance } from "../data/axiosInstance";
import useConnect from "../features/auth/hooks/useConnect";

const App = () => {
  useAxiosInterceptor(axiosInstance);
  useConnect();
  // const { connection, setConnection, chatSocket } = useConnect();

  return (
    <BrowserRouter>
      {/* <ConnectionContext.Provider
        value={{ connection, setConnection, chatSocket }}
      > */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dummy" element={<Dummy />} />
          <Route path="/foo" element={<Foo />} />
        </Route>
        <Route path="/callback" element={<Callback />} />
      </Routes>
      {/* </ConnectionContext.Provider> */}
    </BrowserRouter>
  );
};

export default App;
