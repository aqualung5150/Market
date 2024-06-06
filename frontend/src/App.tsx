import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Callback from "./pages/Callback";
import Layout from "./component/Layout";
import { LoggedInContext } from "./context/LoggedInContext";
import useLoggedIn from "./hooks/useLoggedIn";

function App() {
  const { loggedIn, setLoggedIn } = useLoggedIn();
  return (
    <BrowserRouter>
      <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </LoggedInContext.Provider>
    </BrowserRouter>
  );
}

export default App;
