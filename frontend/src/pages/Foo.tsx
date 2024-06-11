import { useContext, useState } from "react";
import Button from "../components/Button";
import { ConnectionContext } from "../context/ConnectionContext";
import Modal from "../components/Modal";
import Login from "../features/auth/components/Login";

const Foo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { connection } = useContext(ConnectionContext);

  return (
    <div>
      <h1>Foo, the second test</h1>
      <Modal
        children={<Login />}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <Button
        text="글쓰기"
        onClick={() =>
          connection ? alert("글 작성완료!!") : setModalOpen(true)
        }
      />
    </div>
  );
};

export default Foo;
