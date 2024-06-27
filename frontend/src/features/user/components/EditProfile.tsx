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
    `${process.env.REACT_APP_API_URL}/users/profileImage/${user.image}`
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    const formData = new FormData();
    formData.append("nickname", nickname.value);
    formData.append("name", name.value);
    file.file && formData.append("image", file.file);

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
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 items-center">
      <label htmlFor="image">프로필이미지</label>
      <img
        className="w-[200px] h-[200px] object-cover rounded-full cursor-pointer"
        src={file.url}
        onClick={() => profileImage.current?.click()}
      />
      <input
        type="file"
        id="image"
        onChange={file.handleFileChange}
        accept={"image/png, image/gif, image/jpeg"}
        className="hidden"
        ref={profileImage}
      />
      <label htmlFor="nickname">닉네임</label>
      <Input id="nickname" type="text" {...nickname} />
      <label htmlFor="name">이름</label>
      <Input id="name" type="text" {...name} />
      <label htmlFor="email">이메일</label>
      <Input id="email" type="text" value={user.email} disabled={true} />
      <Button text="저장하기" type="submit" disabled={disabled} />
    </form>
  );
};

export default EditProfile;
