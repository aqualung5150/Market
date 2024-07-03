import { useState } from "react";
import { axiosInstance } from "../../../data/axiosInstance";
import useSelectImages from "../../../hooks/useSelectImages";
import useFormInput from "../../../hooks/useFormInput";
import { useNavigate } from "react-router-dom";

const useProductForm = () => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const images = useSelectImages();
  const title = useFormInput("");
  const price = useFormInput("");
  const description = useFormInput("");
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState(0);
  const [isNew, setIsNew] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (categoryId === 0) {
      alert("상품의 카테고리를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("price", price.value);
    formData.append("description", description.value);
    formData.append("categoryId", categoryId.toString());
    formData.append("status", isNew.toString());
    images.files.map((file) => formData.append("image", file));

    try {
      setButtonDisable(true);
      const res = await axiosInstance.postForm("product", formData);
      navigate(`/product/${res.data}`);
    } catch (err: any) {
      alert(err.response.data.message);
    } finally {
      setButtonDisable(false);
    }
  };

  return {
    buttonDisable: { buttonDisable, setButtonDisable },
    categoryId: { categoryId, setCategoryId },
    isNew: { isNew, setIsNew },
    title,
    price,
    description,
    images,
    handleSubmit,
  };
};

export default useProductForm;
