import { useEffect, useState } from "react";
import { axiosInstance } from "data/axiosInstance";
import { useLocation } from "react-router-dom";

const useAxios = <T extends object>(url: string) => {
  const location = useLocation();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      setData(null);
      setError(null);
    };
  }, [url, location]);

  return { data, error, loading };
};

export default useAxios;
