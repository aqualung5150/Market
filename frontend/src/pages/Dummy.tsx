import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../context/LoggedInContext";
import Login from "../component/Login";
import Modal from "../component/Modal";
import { useNavigate } from "react-router-dom";

const Dummy = () => {
  const { loggedIn } = useContext(LoggedInContext);
  const navigate = useNavigate();
  return (
    <div>
      {loggedIn ? (
        <h1>Dummy, the Test...</h1>
      ) : (
        <Modal children={<Login />} open={true} />
      )}
    </div>
  );
};

export default Dummy;
