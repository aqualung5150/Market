import { useContext, useEffect, useState } from "react";
import { ConnectionContext } from "../context/ConnectionContext";
import Login from "../component/Login";
import Modal from "../component/Modal";
import { axiosInstance } from "../data/axiosInstance";

const Dummy = () => {
  const [data, setData] = useState<UserData>();
  const { connection } = useContext(ConnectionContext);

  useEffect(() => {
    if (!connection) return;
    // fetching some data...
    axiosInstance
      .get("/user/me")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("리프레시토큰 만료 - " + err.message));
  }, [connection]);
  return (
    <div>
      {connection ? (
        <div>${data?.name}</div>
      ) : (
        <Modal children={<Login />} open={true} />
      )}
    </div>
  );
};

export default Dummy;
