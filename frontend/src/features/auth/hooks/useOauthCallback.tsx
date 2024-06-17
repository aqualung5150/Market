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
        navigate("/");
      })
      .catch((err) => {
        navigate(-1);
        alert(err);
      });
  }, []);
};

export default useOauthCallback;
