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
  // const [imageUrl, setImageUrl] = useState<string>(
  //   `${process.env.REACT_APP_API_URL}/users/profileImage/${user.image}`
  // );
  // const [file, setFile] = useState<File | null>(null);

  const profileImage = useRef<HTMLInputElement>(null);

  const file = useSelectImage(
    `${process.env.REACT_APP_API_URL}/users/profileImage/${user.image}`
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setDisabled(true);
    e.preventDefault();
    try {
      await axiosInstance.patch(`users/${user.id}`, {
        nickname: nickname.value,
        name: name.value,
      });
      dispatch(
        updateUser({
          nickname: nickname.value,
          name: name.value,
        })
      );
      alert("프로필 저장 완료");
    } catch (err) {
      alert(err);
    }

    if (file.file) {
      try {
        console.log("here");
        const res = await axiosInstance.post(
          `users/${user.id}`,
          { image: file.file ? file.file : undefined },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const image = res.data.image;
        dispatch(
          updateUser({
            image: image,
          })
        );
        file.setFile(null);
        alert("이미지 저장 완료");
      } catch (err) {
        alert("이미지 업로드 실패");
      }
    }

    setDisabled(false);
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const file = e.target.files[0];
  //     if (file) {
  //       // size check
  //       if (file.size > 5 * 1024 * 1024) {
  //         alert("5MB 미만의 이미지만 업로드가 가능합니다.");
  //         e.target.value = ""; // 선택된 파일 초기화
  //         setFile(null);
  //       } else {
  //         setFile(file);
  //         setImageUrl(URL.createObjectURL(file));
  //       }
  //     } else {
  //       alert("파일 선택에 실패했습니다.");
  //     }
  //   }
  // };

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
