import EmailField from "features/auth/components/EmailField";
import PasswordField from "features/auth/components/PasswordField";
import ConfirmPasswordField from "features/auth/components/ConfirmPasswordField";
import NicknameField from "features/auth/components/NicknameField";
import useSignUp from "features/auth/hooks/useSignUp";

const SignUp = () => {
  const {
    email,
    password,
    confirmPassword,
    nickname,
    validations,
    handleSubmit,
  } = useSignUp();

  return (
    <form
      className="flex h-full w-full flex-col items-center gap-10 bg-white p-10"
      onSubmit={handleSubmit}
    >
      <EmailField email={email} validations={validations} />
      <PasswordField password={password} validations={validations} />
      <ConfirmPasswordField
        confirmPassword={confirmPassword}
        validations={validations}
      />
      <NicknameField nickname={nickname} validations={validations} />
      <button
        className="mb-2 h-14 w-[120px] rounded-md bg-green-500 text-base font-semibold text-white"
        type="submit"
      >
        등록
      </button>
    </form>
  );
};

export default SignUp;
