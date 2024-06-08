import {
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

const useAxiosInterceptor = (instance: AxiosInstance) => {
  const handleRequest = (config: InternalAxiosRequestConfig) => {
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
        } catch (err) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          logout(window.location.href); // 현재경로(새로고침)
          localStorage.clear();
        }
        if (error.config) {
          return instance(error.config);
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
