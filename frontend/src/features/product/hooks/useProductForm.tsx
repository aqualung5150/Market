import { axiosInstance } from "data/axiosInstance";
import useFormInput from "hooks/useFormInput";
import useFormTextArea from "hooks/useFormTextArea";
import useSelectImages from "hooks/useSelectImages";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProductData } from "types/product";

const useProductForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [disabled, setDisabled] = useState(false);
  const images = useSelectImages();
  const { inputProps: title, setValue: setTitle } = useFormInput();
  const { inputProps: price, setValue: setPrice } = useFormInput();
  const { inputProps: description, setValue: setDescription } =
    useFormTextArea();
  const [categoryId, setCategoryId] = useState(0);
  const [condition, setCondition] = useState(0);

  const navigate = useNavigate();

  const type = searchParams.get("type");
  const productId = searchParams.get("productId");

  // type === modify
  useEffect(() => {
    if (!type || type !== "modify") return;

    if (!productId) {
      navigate(-1);
      alert("잘못된 접근입니다.");
    }

    const getPrevData = async () => {
      try {
        setDisabled(true);
        const res = await axiosInstance.get(`product/${productId}`);
        const data: ProductData = res.data;
        setTitle(data.title);
        setPrice(data.price.toString());
        setDescription(data.description);
        setCategoryId(data.categoryId);
        setCondition(data.condition);

        // set existing files
        const existingFiles: string[] = [];
        const files: File[] = await Promise.all(
          data.images.map(async (image) => {
            // get image as Blob data
            const imageRes = await axiosInstance.get(
              `${process.env.REACT_APP_API_URL}/product/productImage/${image.url}?impolicy=main`,
              { responseType: "blob" },
            );
            const file = new File([imageRes.data], image.url, {
              type: imageRes.data.type,
            });

            existingFiles[image.order] = file.name;
            return file;
          }),
        );
        images.setFiles(files);
        images.setExistingFiles(existingFiles);
      } catch (err) {
        alert("상품 정보를 불러 올 수 없습니다.");
      } finally {
        setDisabled(false);
      }
    };

    getPrevData();

    return () => {
      setDisabled(false);
      setTitle("");
      setPrice("");
      setDescription("");
      setCategoryId(0);
      setCondition(0);
      images.setFiles([]);
      images.setExistingFiles([]);
      images.setNewFiles([]);
    };
  }, [type]);

  const handleSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "product/add";
    setDisabled(true);

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
    images.newFiles.map((file) => formData.append("image", file, file.name));

    try {
      const res = await axiosInstance.postForm(url, formData);
      navigate(`/product/${res.data}`);
    } catch (err: any) {
      alert(err.response.data.message);
    } finally {
      setDisabled(false);
    }
  };

  const handleSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `product/modify/${productId}`;
    setDisabled(true);

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
    images.newFiles.map((file) => formData.append("image", file, file.name));
    if (images.existingFiles.length > 0)
      images.existingFiles.map((e) => formData.append("existingFiles[]", e));

    try {
      await axiosInstance.postForm(url, formData);
      navigate(`/product/${productId}`);
    } catch (err: any) {
      alert(err.response.data.message);
    } finally {
      setDisabled(false);
    }
  };

  return {
    type,
    disabled: { disabled, setDisabled },
    categoryId: { categoryId, setCategoryId },
    condition: { condition, setCondition },
    title,
    price,
    description,
    images,
    handleSubmitCreate,
    handleSubmitUpdate,
  };
};

export default useProductForm;
