import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../app/store";
import React, { useState } from "react";
import categoryData from "../../data/category.json";
import { ProductTitleProps } from "../../../../types/product";
import ConfirmDelete from "./ConfirmDelete";
import SetStatusModal from "./SetStatusModal";

const ProductTitle = ({ paramId, data }: ProductTitleProps) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openSetStatus, setOpenSetStatus] = useState(false);
  const userId = useSelector((state: RootState) => state.user.id);
  const category = Object.values(categoryData).find(
    (e) => e.id === data?.categoryId
  );

  return (
    <div className="h-full flex flex-col justify-between gap-10">
      <div className="flex-1 text-lg text-gray-700 space-y-3">
        <span>{"카테고리 > "}</span>

        <Link
          className="cursor-pointer"
          to={`/search?category=${category?.id}&page=1`}
        >
          {category?.label}
        </Link>
        <div className="w-[100px] flex flex-col bg-gray-200 rounded-lg items-center shadow-sm">
          <span className="text-center text-xs text-gray-500 p-2 border-b border-gray-300 w-full">
            제품상태
          </span>
          <div className="text-sm text-black  p-2">
            {data.condition ? "새상품" : "중고"}
          </div>
        </div>
        <div className="text-2xl font-bold">{data.title}</div>
        <div className="text-4xl font-bold">
          {data.price.toLocaleString()}원
        </div>
      </div>
      {userId === data.user.id && (
        <div className="flex h-16 cursor-pointer rounded-2xl bg-gray-200 shadow-sm">
          <button
            onClick={() => setOpenSetStatus(true)}
            className="flex-1 border-r border-gray-300"
          >
            상태변경
          </button>
          <Link
            className="flex-1 border-r border-gray-300"
            to={`/product/form?type=modify&productId=${data.id}`}
          >
            <button className="w-full h-full">수정하기</button>
          </Link>

          <button onClick={() => setOpenConfirmDelete(true)} className="flex-1">
            삭제하기
          </button>
        </div>
      )}
      <SetStatusModal
        data={data}
        openSetStatus={openSetStatus}
        setOpenSetStatus={setOpenSetStatus}
      />
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
