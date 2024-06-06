import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Callback = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `http://${process.env.REACT_APP_BASE_URL}/api/auth/google?code=${code}`
    )
      .then((res) => {
        if (!res.ok || res.status === 500) {
          navigate(-1);
          throw new Error("다시 시도해주세요");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("id", data.id);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.name);
        localStorage.setItem("nickname", data.nickname);
        localStorage.setItem("iat", data.exp);
        localStorage.setItem("exp", data.exp);

        // useNavigate를 안쓴 이유
        // Header의 isLoggedIn스테이트를 변경하기 위해 리렌더링할 필요가 있음.
        // window.location.replace("/");
        // **수정 - Callback을 Layout 밖에 두면 페이지가 전환될 때 리렌더링이 일어나서 Header의 isLoggedIn이 업데이트됨.
        navigate(-1);
      })
      .catch((err) => alert(err.message));
  }, [code]);

  return <div></div>;
};

export default Callback;
