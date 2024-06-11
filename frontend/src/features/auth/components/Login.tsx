import googleLoginImg from "../../../assets/google_login.svg";
import styles from "./Login.module.css";

const Login = () => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=${process.env.REACT_APP_GOOGLE_RESPONSE_TYPE}&scope=email+profile`;
  return (
    <div className={styles.container}>
      <h1>로그인</h1>
      <div className={styles.socialLogin}>
        <a href={googleAuthUrl}>
          <img src={googleLoginImg} alt="Sign in with Google" />
        </a>
      </div>
      <div className={styles.socialLogin}>
        <a href={googleAuthUrl}>
          <img src={googleLoginImg} alt="Sign in with Google" />
        </a>
      </div>
    </div>
  );
};

export default Login;
