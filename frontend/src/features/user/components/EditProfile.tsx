import { RootState } from "app/store";
import { axiosInstance } from "data/axiosInstance";
import useFormInput from "hooks/useFormInput";
import useSelectImage from "hooks/useSelectImage";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../userSlice";

const EditProfile = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { inputProps: nickname } = useFormInput(user.nickname);
  const [disabled, setDisabled] = useState(false);
  const profileImage = useRef<HTMLInputElement>(null);
  const file = useSelectImage(
    `${process.env.REACT_APP_API_URL}/users/profileImage/${user.image}`,
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    const formData = new FormData();
    formData.append("nickname", nickname.value);
    file.file && formData.append("image", file.file, file.file.name);

    try {
      const res = await axiosInstance.postForm(`users/${user.id}`, formData);
      dispatch(updateUser(res.data));
      file.setFile(null);
      alert("프로필 저장 완료");
    } catch (err: any) {
      alert(err.response.data.message);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-1 flex-col items-center gap-10 p-10"
    >
      <div className="w-full max-w-96">
        <img
          loading="lazy"
          className="aspect-square h-full w-full cursor-pointer rounded-full object-cover shadow"
          src={file.url}
          onClick={() => profileImage.current?.click()}
        />
        <input
          type="file"
          onChange={file.handleFileChange}
          accept={"image/png, image/gif, image/jpeg"}
          className="hidden"
          ref={profileImage}
        />
      </div>
      <div className="w-full space-y-2 rounded-lg border bg-white p-3">
        <label htmlFor="nickname">닉네임</label>
        <input
          className="w-full rounded border p-2"
          id="nickname"
          type="text"
          {...nickname}
        />
      </div>
      <div className="w-full space-y-2 rounded-lg border bg-white p-3">
        <label htmlFor="email">이메일</label>
        <input
          className="w-full rounded border p-2"
          id="email"
          type="text"
          value={user.email}
          disabled={true}
        />
      </div>

      <button
        className="button-green h-[50px] w-[100px]"
        type="submit"
        disabled={disabled}
      >
        저장
      </button>
    </form>
  );
};

export default EditProfile;
