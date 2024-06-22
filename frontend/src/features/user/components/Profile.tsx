import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import myImg from "../../../assets/default_thumbnail.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../data/axiosInstance";
import { User } from "../../../@types/user";
import Button from "../../../components/Button";
import { setOpenChat, setSendTo } from "../../chat/chatSlice";

const Profile = () => {
  const paramId = useParams().id;
  const me = useSelector((state: RootState) => state.user);
  const [profileData, setProfileData] = useState<User>();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axiosInstance.get(`user/${paramId}`);
        setProfileData(res.data);
      } catch (err) {
        alert("유저 정보를 불러오지 못했습니다");
      }
    };
    getUserData();
  }, []);

  if (!profileData) return null;

  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="flex m-10 w-2/3 min-h-[300px] border rounded-md">
        <div className="w-1/5 p-5">
          <img className="rounded-full" src={myImg} />
        </div>
        <div className="p-5 flex-1">{profileData.nickname}</div>
        <div>{paramId}</div>
      </div>
      {me.id !== profileData.id && (
        <Button
          text="채팅하기"
          onClick={() => {
            dispatch(setSendTo(profileData.id));
            dispatch(setOpenChat(true));
          }}
        />
      )}
    </div>
  );
};

export default Profile;
