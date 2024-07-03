import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setUser } from "../../user/userSlice";

const useOauthCallback = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const url = `${process.env.REACT_APP_BASE_URL}/api/auth/google?code=${code}`;

  useEffect(() => {
    console.log(code);
    axios
      .get(url)
      .then((res) => {
        console.log("useOauthCallback");
        dispatch(setUser(res.data));
        const redirect = sessionStorage.getItem("redirect");
        if (redirect) {
          sessionStorage.removeItem("redirect");
          navigate(redirect, { replace: true });
        } else navigate("/", { replace: true });
      })
      .catch((err) => {
        navigate("/", { replace: true });
        alert(err);
      });
  }, [dispatch, navigate]);
};

export default useOauthCallback;
