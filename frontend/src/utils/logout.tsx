const logout = async () => {
  localStorage.removeItem("id");
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("nickname");
  localStorage.removeItem("iat");
  localStorage.removeItem("exp");
  // localStorage.removeItem("avatar");
  const url = `http://${process.env.REACT_APP_BASE_URL}/api/auth/logout`;
  fetch(url, {
    method: "POST",
  })
    .then(() => {
      window.location.href = "/";
    })
    .catch((err) => alert(err.message));
};

export default logout;
