import { useEffect } from "react";
import googleLoginImg from "../assets/google_login.svg";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      alert("이미 로그인되어 있습니다.");
      navigate("/");
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <a
          href={`https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=${process.env.REACT_APP_GOOGLE_RESPONSE_TYPE}&scope=email+profile`}
        >
          <img src={googleLoginImg} alt="Sign in with Google" />
        </a>
        <a
          href={`https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=${process.env.REACT_APP_GOOGLE_RESPONSE_TYPE}&scope=email+profile`}
        >
          <img src={googleLoginImg} alt="Sign in with Google" />
        </a>
      </div>
    </div>
  );
}

export default Login;
