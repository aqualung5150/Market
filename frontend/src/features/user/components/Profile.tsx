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
        <div className="flex w-full flex-col items-center p-10">
          <div className="aspect-square h-[350px] p-9">
            <img
              className="aspect-square h-full max-w-full rounded-full object-cover"
              src={`${process.env.REACT_APP_API_URL}/users/profileImage/${data.image}`}
            />
          </div>
          <div className="flex w-full flex-col rounded-2xl bg-white p-5 md:w-2/3">
            <span className="text-3xl font-bold">{data.nickname}</span>
            <p className="mt-2 flex-1">
              {
                "이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n"
              }
            </p>
            {me.id !== data.id && (
              <div className="mt-2 self-end">
                <SendButton
                  className="h-10 w-20 rounded bg-green-300"
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
