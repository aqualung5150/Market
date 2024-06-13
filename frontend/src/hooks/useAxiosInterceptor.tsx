import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import isTokenExpired from "../utils/isTokenExpired";
import refreshToken from "../utils/refreshToken";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../features/user/userSlice";

const useAxiosInterceptor = (instance: AxiosInstance) => {
  const dispatch = useDispatch();

  const handleRequest = async (config: InternalAxiosRequestConfig) => {
    return config;
  };
  const handleResponse = (response: AxiosResponse) => {
    return response;
  };

  const handleError = async (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (isTokenExpired()) {
        try {
          const res = await refreshToken();
          console.log("new token generated");
          dispatch(setUser(res.data));
          return error.config && axios(error.config);
        } catch (err) {
          console.log("refresh token expired");
          dispatch(logout(window.location.href));
        }
      }
    }
    return Promise.reject(error);
  };

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      handleRequest,
      handleError
    );
    const responseInterceptor = instance.interceptors.response.use(
      handleResponse,
      handleError
    );

    return () => {
      instance.interceptors.response.eject(responseInterceptor);
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return instance;
};

export default useAxiosInterceptor;
