import { useEffect, useState } from "react";
import Login from "../features/auth/components/Login";
import Modal from "../components/Modal";
import { axiosInstance } from "../data/axiosInstance";
import { UserData } from "../@types/user";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Dummy = () => {
  const [data, setData] = useState<UserData>();
  const userId = useSelector((state: RootState) => state.user.id);
  // const { connection, setConnection } = useContext(ConnectionContext);

  useEffect(() => {
    if (!userId) return;
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
      {userId ? (
        <div>${data?.name}</div>
      ) : (
        <Modal children={<Login />} open={true} />
      )}
    </div>
  );
};

export default Dummy;
