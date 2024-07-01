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
    <>
      <div className="p-2 text-lg text-gray-700">
        <span>{"카테고리 > "}</span>
        <span
          className="cursor-pointer"
          onClick={() => navigate(`/search?category=${category?.id}&page=1`)}
        >
          {category?.label}
        </span>
      </div>
      <div className="p-2 text-2xl font-bold">{data.title}</div>
      <div className="p-2 text-4xl font-bold">
        {data.price.toLocaleString()}원
      </div>
      {userId === data.user.id && (
        <div className="m-2 flex-1 flex justify-center items-center cursor-pointer">
          <button
            onClick={() => setOpenConfirmDelete(true)}
            className="w-[100px] h-[40px] rounded bg-gray-300"
          >
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
    </>
  );
};

export default React.memo(ProductTitle);
