import axios from "axios";

const logout = async (redirect: string) => {
  const url = `${process.env.REACT_APP_BASE_URL}/api/auth/logout`;
  axios.post(url).catch(() => {});

  localStorage.clear();
  window.location.href = redirect;
};

export default logout;
