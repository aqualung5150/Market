import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../app/store";
import React, { useState } from "react";
import categoryData from "../../data/category.json";
import { ProductTitleProps } from "../../../../types/product";
import ConfirmDelete from "./ConfirmDelete";

const ProductTitle = ({ paramId, data }: ProductTitleProps) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const userId = useSelector((state: RootState) => state.user.id);
  const navigate = useNavigate();
  const category = Object.values(categoryData).find(
    (e) => e.id === data?.categoryId
  );

  return (
    <div className="h-full flex flex-col justify-between gap-10">
      <div className="flex-1 text-lg text-gray-700 space-y-3">
        <span>{"카테고리 > "}</span>
        <span
          className="cursor-pointer"
          onClick={() => navigate(`/search?category=${category?.id}&page=1`)}
        >
          {category?.label}
        </span>
        <div className="text-2xl font-bold">{data.title}</div>
        <div className="text-4xl font-bold">
          {data.price.toLocaleString()}원
        </div>
      </div>
      {userId === data.user.id && (
        <div className="flex h-16 cursor-pointer rounded-2xl bg-gray-100">
          <button
            onClick={() => setOpenConfirmDelete(true)}
            className="flex-1 border-r"
          >
            글 삭제하기
          </button>
          <button
            onClick={() => setOpenConfirmDelete(true)}
            className="flex-1 border-r"
          >
            글 삭제하기
          </button>
          <button onClick={() => setOpenConfirmDelete(true)} className="flex-1">
            글 삭제하기
          </button>
        </div>
      )}
      <ConfirmDelete
        paramId={paramId}
        category={category}
        openConfirmDelete={openConfirmDelete}
        setOpenConfirmDelete={setOpenConfirmDelete}
      />
    </div>
  );
};

export default React.memo(ProductTitle);
