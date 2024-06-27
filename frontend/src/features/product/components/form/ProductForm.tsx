import React, { useState } from "react";
import Input from "../../../../components/Input";
import useFormInput from "../../../../hooks/useFormInput";
import useSelectImages from "../../../../hooks/useSelectImages";
import ImageSelector from "./ImageSelector";
import { axiosInstance } from "../../../../data/axiosInstance";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const [disabled, setDisabled] = useState(false);
  const images = useSelectImages();
  const title = useFormInput("");
  const price = useFormInput("");
  const description = useFormInput("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("price", price.value);
    formData.append("description", description.value);
    images.files.map((file) => formData.append("image", file));
    //test
    formData.append("status", "1");
    formData.append("categoryId", "1");

    try {
      setDisabled(true);
      const res = await axiosInstance.postForm("product/form", formData);
      navigate(`/product/${res.data}`);
    } catch (err) {
      alert(err);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ImageSelector {...images} />
      <Input placeholder="상품명" {...title} />
      <Input placeholder="₩ 판매가격" {...price} />
      <Input placeholder="상품에 대한 설명을 입력해주세요." {...description} />
      <button type="submit" disabled={disabled}>
        보내기
      </button>
    </form>
  );
};

export default ProductForm;
