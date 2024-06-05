import { useNavigate } from "react-router-dom";

const logout = async () => {
  //   const navigate = useNavigate();
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("id");
  localStorage.removeItem("name");
  localStorage.removeItem("nickname");
  localStorage.removeItem("access_token_exp");
  // localStorage.removeItem("avatar");
  const url = `http://${process.env.REACT_APP_BASE_URL}/api/auth/logout`;
  fetch(url, {
    method: "POST",
  })
    .then((res) => {
      alert("로그아웃 되었습니다.");
      //   navigate("/");
      window.location.href = "/";
    })
    .catch((err) => alert(err.message));
};

export default logout;
