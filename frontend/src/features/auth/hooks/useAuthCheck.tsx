import { useEffect } from "react";
import { axiosInstance } from "../../../data/axiosInstance";

const useAuthCheck = () => {
  useEffect(() => {
    const initialConnect = async () => {
      try {
        await axiosInstance.post("auth/check");
      } catch (err) {}
    };

    initialConnect();
  }, []);
};

export default useAuthCheck;
