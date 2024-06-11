import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import isTokenExpired from "../utils/isTokenExpired";
import refreshToken from "../utils/refreshToken";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import userSlice, { logout, updateUser } from "../features/user/userSlice";

const useAxiosInterceptor = (instance: AxiosInstance) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleRequest = async (config: InternalAxiosRequestConfig) => {
    return config;
  };
  const handleResponse = (response: AxiosResponse) => {
    return response;
  };

  const handleError = async (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (isTokenExpired(user.exp)) {
        try {
          const res = await refreshToken();
          console.log(res.data.message);
          dispatch(updateUser(res.data));
          return error.config && instance(error.config);
        } catch (err) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
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
