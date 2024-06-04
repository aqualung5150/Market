import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Callback() {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [userData, setUserData] = useState<ResLogin>();

  useEffect(() => {
    fetch(
      `http://${process.env.REACT_APP_BASE_URL}/api/auth/google?code=${code}`
    )
      .then((res) => {
        if (!res.ok || res.status === 500) throw new Error("다시 시도해주세요");
        return res.json();
      })
      .then((data) => setUserData(data))
      .catch((err) => alert(err));
  }, [code]);

  return (
    <div>
      <li>${userData?.message}</li>
      <li>${userData?.id}</li>
      <li>${userData?.name}</li>
      <li>${userData?.email}</li>
      <li>${userData?.nickname}</li>
      <li>${userData?.access_token}</li>
    </div>
  );
}

export default Callback;
