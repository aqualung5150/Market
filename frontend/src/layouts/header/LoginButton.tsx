import Button from "../../components/Button";
import { useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Login from "../../features/auth/components/Login";
import styles from "./Header.module.css";
import { ConnectionContext } from "../../context/ConnectionContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import userSlice, { logout } from "../../features/user/userSlice";

const LoginButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // const { connection } = useContext(ConnectionContext);
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();

  return (
    // <div className={styles.login}>
    <div className="flex justify-center items-center">
      {userId ? (
        <div>
          <Button
            text="logout"
            onClick={() => {
              // dispatch(userSlice.actions.resetUser());
              // dispatch(
              //   authSlice.actions.logout({
              //     redirect: "/",
              //   })
              // );
              dispatch(logout("/"));
            }}
          />
        </div>
      ) : (
        <div>
          <Button text="login" onClick={() => setModalOpen(true)}></Button>
          <Modal
            children={<Login />}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default LoginButton;
