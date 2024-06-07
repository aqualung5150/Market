import axios from "axios";

const logout = async (redirect: string) => {
  const url = `http://${process.env.REACT_APP_BASE_URL}/api/auth/logout`;
  axios
    .post(url)
    .then(() => {
      localStorage.clear();
      window.location.href = redirect;
    })
    .catch((err) => alert(err.message));
};

export default logout;
