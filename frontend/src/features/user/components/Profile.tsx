import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import SendButton from "../../chat/components/SendButton";

const Profile = () => {
  const paramId = useParams().id;
  const me = useSelector((state: RootState) => state.user);
  const { data, error, loading } = useAxios(`users/${paramId}`);

  return (
    <>
      {loading && <Loading text="로딩중..." />}
      {error && <div>존재하지 않는 회원입니다.</div>}
      {data && (
        <div className="p-10 w-full flex flex-col items-center">
          <div className="p-9 aspect-square h-[350px]">
            <img
              className="h-full max-w-full aspect-square rounded-full object-cover"
              src={`${process.env.REACT_APP_API_URL}/users/profileImage/${data.image}`}
            />
          </div>
          <div className="p-5 w-full md:w-2/3 flex flex-col bg-white rounded-2xl">
            <span className="text-3xl font-bold">{data.nickname}</span>
            <p className="flex-1 mt-2">
              {
                "이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n"
              }
            </p>
            {me.id !== data.id && (
              <div className="mt-2 self-end">
                <SendButton
                  className="w-20 h-10 bg-green-300 rounded"
                  text="채팅하기"
                  sendTo={data.id}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
