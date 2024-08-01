import axios from "axios";
import { setUser } from "features/user/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const useOauthCallback = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const url = `${process.env.REACT_APP_BASE_URL}/api/auth/google?code=${code}`;

  useEffect(() => {
    axios
      .post(url)
      .then((res) => {
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
