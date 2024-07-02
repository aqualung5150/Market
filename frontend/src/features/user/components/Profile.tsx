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
    alert("유저 정보를 불러올 수 없습니다.");
    navigate(-1);
  }

  return (
    <>
      {loading && <Loading text="로딩중..." />}
      {data && (
        <div className="p-10 w-full flex flex-col">
          <div className="w-full h-[300px] flex flex-wrap gap-2">
            <div className="p-9 h-full">
              <img
                className="h-full max-w-full aspect-square rounded-full object-cover"
                src={`${process.env.REACT_APP_API_URL}/users/profileImage/${data.image}`}
              />
            </div>
            <div className="p-5 h-full min-h-[200px] flex-1 flex flex-col justify-between bg-white rounded-2xl">
              <span className="text-3xl font-bold">{data.nickname}</span>
              <p className="mt-2 overflow-auto">
                {
                  "이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n"
                }
              </p>
              {me.id !== data.id && (
                <div className="mt-2 self-end">
                  <button
                    className="w-20 h-10 bg-green-300 rounded"
                    onClick={() => {
                      dispatch(setSendTo(data.id));
                      dispatch(setOpenChat(true));
                    }}
                  >
                    채팅하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
