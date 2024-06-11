import { useContext, useState } from "react";
import Button from "../components/Button";
import { ConnectionContext } from "../context/ConnectionContext";
import Modal from "../components/Modal";
import Login from "../features/auth/components/Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { updateUser } from "../features/user/userSlice";

const Foo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // const { connection } = useContext(ConnectionContext);

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>{user.name}</h2>
      <Button
        text="승준"
        onClick={() => {
          dispatch(updateUser({ name: "최승준" }));
        }}
      />
      <h1>Foo, the second test</h1>
      <Modal
        children={<Login />}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <Button
        text="글쓰기"
        onClick={() => (user.id ? alert("글 작성완료!!") : setModalOpen(true))}
      />
    </div>
  );
};

export default Foo;
