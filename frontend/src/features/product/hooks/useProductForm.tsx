import { useEffect, useState } from "react";
import { axiosInstance } from "../../../data/axiosInstance";
import useSelectImages from "../../../hooks/useSelectImages";
import useFormInput from "../../../hooks/useFormInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProductData } from "../../../types/product";

const useProductForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [buttonDisable, setButtonDisable] = useState(false);
  const images = useSelectImages();
  const title = useFormInput("");
  const price = useFormInput("");
  const description = useFormInput("");
  const [categoryId, setCategoryId] = useState(0);
  const [condition, setCondition] = useState(0);

  const navigate = useNavigate();

  const type = searchParams.get("type");

  // type === modify
  useEffect(() => {
    if (!type || type !== "modify") return;
    const productId = searchParams.get("productId");

    const getPrevData = async () => {
      try {
        const res = await axiosInstance.get(`product/${productId}`);
        const data: ProductData = res.data;
        title.setValue(data.title);
        price.setValue(data.price.toString());
        description.setValue(data.description);
        setCategoryId(data.categoryId);
        setCondition(data.condition);

        // images to File blob
        const files: File[] = [];
        const urls: string[] = [];
        data.images.map(async (image) => {
          const imageRes = await axiosInstance.get(
            `${process.env.REACT_APP_API_URL}/product/productImage/${image.url}`,
            { responseType: "blob" }
          );
          const file = new File([imageRes.data], image.url, {
            type: imageRes.data.type,
          });
          files.push(file);
          urls.push(URL.createObjectURL(file));
          if (urls.length === data.images.length) {
            images.setFiles(files);
            images.setUrls(urls);
          }
        });
      } catch (err) {
        alert("상품 정보를 불러 올 수 없습니다.");
      }
    };

    getPrevData();
  }, [type]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "product/" + (type === "regist" ? "add" : "modify");
    setButtonDisable(true);

    if (categoryId === 0) {
      alert("상품의 카테고리를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("price", price.value);
    formData.append("description", description.value);
    formData.append("categoryId", categoryId.toString());
    formData.append("condition", condition.toString());
    images.files.map((file) => formData.append("image", file));

    try {
      const res = await axiosInstance.postForm(url, formData);
      navigate(`/product/${res.data}`);
    } catch (err: any) {
      alert(err.response.data.message);
    } finally {
      setButtonDisable(false);
    }
  };

  return {
    type,
    buttonDisable: { buttonDisable, setButtonDisable },
    categoryId: { categoryId, setCategoryId },
    condition: { condition, setCondition },
    title,
    price,
    description,
    images,
    handleSubmit,
  };
};

export default useProductForm;
