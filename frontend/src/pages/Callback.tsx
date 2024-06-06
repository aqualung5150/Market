import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Callback = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_BASE_URL}/api/auth/google?code=${code}`
      )
      .then(() => {
        // App.tsx에서 useLoggedIn을 호출하기 때문에 따로 유저데이터를 저장할 필요가 없음.
        // * Callback url에서만 다뤄야 하는 데이터가 있다면 수정될 수 있음.
        navigate(-1);
      })
      .catch((err) => {
        navigate(-1);
        alert(err);
      });
  }, [code]);

  return <div></div>;
};

export default Callback;
