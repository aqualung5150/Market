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
    (e) => e.id === data?.categoryId,
  );

  return (
    <div className="flex h-full flex-col justify-between gap-10">
      <div className="flex-1 space-y-3 text-lg text-gray-700">
        <span>{"카테고리 > "}</span>

        <Link
          className="cursor-pointer"
          to={`/search?category=${category?.id}&page=1`}
        >
          {category?.label}
        </Link>
        <div className="flex w-[100px] flex-col items-center rounded-lg bg-gray-200 shadow-sm">
          <span className="w-full border-b border-gray-300 p-2 text-center text-xs text-gray-500">
            제품상태
          </span>
          <div className="p-2 text-sm text-black">
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
            <button className="h-full w-full">수정하기</button>
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
