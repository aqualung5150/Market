import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Callback from "./pages/Callback";
import Layout from "./component/Layout";
import { LoggedInContext } from "./context/LoggedInContext";
import useLoggedIn from "./hooks/useLoggedIn";
import Dummy from "./pages/Dummy";
import Foo from "./pages/Foo";

const App = () => {
  const { loggedIn, setLoggedIn } = useLoggedIn();
  return (
    <BrowserRouter>
      <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dummy" element={<Dummy />} />
            <Route path="/foo" element={<Foo />} />
          </Route>
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </LoggedInContext.Provider>
    </BrowserRouter>
  );
};

export default App;
