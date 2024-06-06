import axios from "axios";

const logout = async () => {
  const url = `http://${process.env.REACT_APP_BASE_URL}/api/auth/logout`;
  axios
    .post(url)
    .then(() => {
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("nickname");
      localStorage.removeItem("iat");
      localStorage.removeItem("exp");
      // localStorage.removeItem("avatar");
      window.location.href = "/";
    })
    .catch((err) => alert(err.message));
};

export default logout;
