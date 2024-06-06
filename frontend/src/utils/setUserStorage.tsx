const setUserStorage = (data: UserData) => {
  localStorage.setItem("id", data.id.toString());
  localStorage.setItem("email", data.email);
  localStorage.setItem("name", data.name);
  localStorage.setItem("nickname", data.nickname);
  localStorage.setItem("iat", data.iat.toString());
  localStorage.setItem("exp", data.exp.toString());
};

export default setUserStorage;
