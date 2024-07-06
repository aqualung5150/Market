import { useRef, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { axiosInstance } from "../../../data/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { updateUser } from "../userSlice";
import useFormInput from "../../../hooks/useFormInput";
import useSelectImage from "../../../hooks/useSelectImage";

const EditProfile = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const name = useFormInput(user.name);
  const nickname = useFormInput(user.nickname);
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
    formData.append("name", name.value);
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
      <div className="h-[300px] w-[300px]">
        <img
          className="h-full max-w-full cursor-pointer rounded-full object-cover shadow"
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
      <div className="w-full space-y-2 rounded-lg bg-white p-3 shadow">
        <label htmlFor="nickname">닉네임</label>
        <Input id="nickname" type="text" {...nickname} />
      </div>
      <div className="w-full space-y-2 rounded-lg bg-white p-3 shadow">
        <label htmlFor="name">이름</label>
        <Input id="name" type="text" {...name} />
      </div>
      <div className="w-full space-y-2 rounded-lg bg-white p-3 shadow">
        <label htmlFor="email">이메일</label>
        <Input id="email" type="text" value={user.email} disabled={true} />
      </div>

      <button
        className="h-[50px] w-[100px] rounded-lg bg-green-400 text-lg font-bold"
        type="submit"
        disabled={disabled}
      >
        저장
      </button>
    </form>
  );
};

export default EditProfile;
