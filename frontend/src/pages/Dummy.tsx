import { useContext, useEffect, useState } from "react";
import { ConnectionContext } from "../context/ConnectionContext";
import Login from "../features/auth/components/Login";
import Modal from "../components/Modal";
import { axiosInstance } from "../data/axiosInstance";
import { UserData } from "../@types/user";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Dummy = () => {
  const [data, setData] = useState<UserData>();
  const user = useSelector((state: RootState) => state.user);
  // const { connection, setConnection } = useContext(ConnectionContext);

  useEffect(() => {
    if (!user.id) return;
    // fetching some data...
    axiosInstance
      .get("/user/me")
      .then((res) => {
        setData(res.data);
        // setConnection(true);
      })
      .catch((err) => console.log("리프레시토큰 만료 - " + err.message));
  }, []);
  return (
    <div>
      {user.id ? (
        <div>${data?.name}</div>
      ) : (
        <Modal children={<Login />} open={true} />
      )}
    </div>
  );
};

export default Dummy;
