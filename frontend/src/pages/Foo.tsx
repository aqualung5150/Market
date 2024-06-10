import { useContext, useState } from "react";
import Button from "../component/Button";
import { ConnectionContext } from "../context/ConnectionContext";
import Modal from "../component/Modal";
import Login from "../component/Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { connectionSlice, fooSlice } from "../redux/connectionSlice";

const Foo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { connection } = useContext(ConnectionContext);

  // redux 연습
  const user = useSelector((state: RootState) => {
    return state.connection;
  });
  const dispatch = useDispatch();

  const foo = useSelector((state: RootState) => {
    return state.foo;
  });

  return (
    <div>
      <h1>Foo, the second test</h1>
      <h2>Redux: {user.name}</h2>
      <h2>fooSlice: {foo.value}</h2>
      <Button
        text="UPPER"
        onClick={() => {
          dispatch(
            connectionSlice.actions.setUser({
              name: "HI CONNECTION",
            })
          );
          dispatch(
            fooSlice.actions.setFoo({
              fooInput: "HI FOO",
            })
          );
        }}
      />
      <Button
        text="lower"
        onClick={() => {
          dispatch(
            connectionSlice.actions.setUser({
              name: "hi connection text",
            })
          );
          dispatch(
            fooSlice.actions.setFoo({
              fooInput: "hi foo",
            })
          );
        }}
      />
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
