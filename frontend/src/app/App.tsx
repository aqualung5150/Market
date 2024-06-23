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
import Bar from "../pages/Bar";
import Users from "../pages/Users";
import Oh from "../pages/Oh";
import Profile from "../features/user/components/Profile";
import EditProfile from "../features/user/components/EditProfile";
// import chatSocket from "../features/chat/chatSocket";

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
          </Route>
          <Route path="callback" element={<Callback />} />
        </Routes>
      </SocketContext.Provider>
    </BrowserRouter>
  );
};

export default App;
