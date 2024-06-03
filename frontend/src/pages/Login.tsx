import googleLoginImg from "../assets/google_login.svg";

function Login() {
  return (
    <a
      href={`https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=${process.env.REACT_APP_GOOGLE_RESPONSE_TYPE}&scope=email+profile`}
    >
      <img src={googleLoginImg} alt="Sign in with Google" />
    </a>
  );
}

export default Login;
