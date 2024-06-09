import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import isTokenExpired from "../utils/isTokenExpired";
import refreshToken from "../utils/refreshToken";
import { jwt } from "../data/jwt";
import logout from "../utils/logout";
import { useEffect } from "react";
import setLocalStorage from "../utils/setLocalStorage";

const useAxiosInterceptor = (instance: AxiosInstance) => {
  const handleRequest = async (config: InternalAxiosRequestConfig) => {
    const token = jwt.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  };
  const handleResponse = (response: AxiosResponse) => {
    return response;
  };

  const handleError = async (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (isTokenExpired()) {
        try {
          await refreshToken();
          return error.config && instance(error.config);
        } catch (err) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          // 현재경로(새로고침) - connection을 false로 업데이트하고 socket연결을 끊기 위해
          logout(window.location.href);
          localStorage.clear();
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
