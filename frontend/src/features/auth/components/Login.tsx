import useFormInput from "hooks/useFormInput";

const Login = () => {
  const { inputProps: email } = useFormInput();
  const { inputProps: password } = useFormInput();

  return (
    <div className="flex flex-col justify-center gap-3 p-3">
      <input
        className="h-12 rounded border p-2"
        {...email}
        placeholder="Email"
      />
      <input
        className="h-12 rounded border p-2"
        {...password}
        placeholder="Password"
      />
    </div>
  );
};

export default Login;
