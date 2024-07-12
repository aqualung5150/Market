import { RootState } from "app/store";
import Loading from "components/Loading";
import NotFound from "components/NotFound";
import SendButton from "features/chat/components/SendButton";
import useAxios from "hooks/useAxios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PublicUser } from "types/user";

const Profile = () => {
  const paramId = useParams().id;
  const me = useSelector((state: RootState) => state.user);
  const { data, error, loading } = useAxios<PublicUser>(`users/${paramId}`);

  return (
    <>
      {loading && <Loading text="로딩중..." />}
      {error && <NotFound title="존재하지 않는 회원입니다." />}
      {data && (
        <div className="flex w-full flex-col items-center gap-10 p-10">
          <div className="aspect-square h-96 w-96">
            <img
              className="aspect-square h-full max-w-full rounded-full object-cover"
              src={`${process.env.REACT_APP_API_URL}/users/profileImage/${data.image}`}
            />
          </div>
          <div className="flex w-full flex-col gap-5 rounded-2xl bg-white md:w-2/3">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{data.nickname}</span>
              <span className="text-xl text-gray-500">#{data.id}</span>
            </div>
            <p className="flex-1">
              {
                "이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n이것은 소개글입니다. 이것은 소개글입니다. 이것은 소개글입니다.\n"
              }
            </p>
            {me.id !== data.id && (
              <div className="self-end">
                <SendButton
                  className="h-10 w-20 rounded bg-green-500 font-bold text-white"
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
