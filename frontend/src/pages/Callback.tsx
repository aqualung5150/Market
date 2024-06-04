import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";

function Callback() {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `http://${process.env.REACT_APP_BASE_URL}/api/auth/google?code=${code}`
    )
      .then((res) => {
        if (!res.ok || res.status === 500) {
          navigate("/");
          throw new Error("다시 시도해주세요");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("id", data.id);
        localStorage.setItem("name", data.name);
        localStorage.setItem("nickname", data.nickname);
        localStorage.setItem("access_token", data.access_token);
        const decoded = jwtDecode<JwtPayload>(data.access_token);
        const exp = decoded.exp?.toString() as string;
        localStorage.setItem("access_token_exp", exp);
        //todo
        // localStorage.setItem("avatar", `/api/user/${userId}/photo?timestamp=${Date.now()}`);
        localStorage.setItem("isLoggedIn", "true");

        alert("로그인에 성공하였습니다.");
        navigate("/");
      })
      .catch((err) => alert(err.message));
  }, [code]);

  return <h1>유저 정보를 불러오는 중입니다</h1>;
}

export default Callback;
