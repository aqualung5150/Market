import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./component/Login";
import Callback from "./pages/Callback";
import Layout from "./component/Layout";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    //todo
    console.log("initial run - login state???");
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
