import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../context/LoggedInContext";
import Login from "../component/Login";
import Modal from "../component/Modal";
import { axiosInstance } from "../data/axiosInstance";

const Dummy = () => {
  const [data, setData] = useState<UserData>();
  const { loggedIn } = useContext(LoggedInContext);

  useEffect(() => {
    if (!loggedIn) return;
    // fetching some data...
    axiosInstance
      .get("/user/me")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("리프레시토큰 만료 - " + err.message));
  }, [loggedIn]);
  return (
    <div>
      {loggedIn ? (
        <div>${data?.name}</div>
      ) : (
        <Modal children={<Login />} open={true} />
      )}
    </div>
  );
};

export default Dummy;
