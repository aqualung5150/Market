import logout from "../../utils/logout";
import Button from "../Button";
import { useContext, useState } from "react";
import Modal from "../Modal";
import Login from "../Login";
import styles from "../../styles/Header.module.css";
import { ConnectionContext } from "../../context/ConnectionContext";

const LoginButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { connection } = useContext(ConnectionContext);
  return (
    <div className={styles.login}>
      {connection ? (
        <div>
          <Button text="logout" onClick={() => logout("/")} />
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
