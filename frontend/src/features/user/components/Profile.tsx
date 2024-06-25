import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import { setOpenChat, setSendTo } from "../../chat/chatSlice";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";

const Profile = () => {
  const paramId = useParams().id;
  const me = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, loading } = useAxios(`users/${paramId}`);

  if (error) {
    alert("유저 정보를 불러오지 못했습니다.");
    navigate(-1);
  }

  return (
    <>
      {loading && <Loading />}
      {data && (
        <div className="flex flex-col flex-1 items-center">
          <div className="flex m-10 w-2/3 min-h-[300px] border rounded-md">
            <div className="w-1/5 p-5">
              <img
                className=" w-16 h-16 min-w-16 rounded-full object-cover"
                src={`${process.env.REACT_APP_API_URL}/users/profileImage/${data.image}`}
              />
            </div>
            <div className="p-5 flex-1">{data.nickname}</div>
            <div>{paramId}</div>
          </div>
          {me.id !== data.id && (
            <Button
              text="채팅하기"
              onClick={() => {
                dispatch(setSendTo(data.id));
                dispatch(setOpenChat(true));
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
