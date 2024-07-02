import React, { useState } from "react";
import Input from "../../../../components/Input";
import useFormInput from "../../../../hooks/useFormInput";
import useSelectImages from "../../../../hooks/useSelectImages";
import ImageSelector from "./ImageSelector";
import { axiosInstance } from "../../../../data/axiosInstance";
import { useNavigate } from "react-router-dom";
import categoryData from "../../data/category.json";
import { CategoryData } from "../../../../types/product";

const ProductForm = () => {
  const [disabled, setDisabled] = useState(false);
  const images = useSelectImages();
  const title = useFormInput("");
  const price = useFormInput("");
  const description = useFormInput("");
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState(0);

  const categories: CategoryData[] = [];
  Object.values(categoryData).map((category) => categories.push(category));

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
    images.files.map((file) => formData.append("image", file));
    formData.append("categoryId", categoryId.toString());
    //test
    formData.append("status", "1");

    try {
      setDisabled(true);
      const res = await axiosInstance.postForm("product", formData);
      navigate(`/product/${res.data}`);
    } catch (err: any) {
      alert(err.response.data.message);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form className="w-full h-full" onSubmit={handleSubmit}>
      <ImageSelector {...images} />
      <ul className="border w-[150px] rounded m-2 space-y-2">
        {categories.map((category) => (
          <li
            onClick={() => setCategoryId(category.id)}
            className="text-center border-b"
            key={category.id}
          >
            {category.label}
          </li>
        ))}
      </ul>
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
