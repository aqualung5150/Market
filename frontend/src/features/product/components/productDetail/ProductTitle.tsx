import categoryData from "../../data/category.json";
import { RootState } from "app/store";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProductTitleProps } from "types/product";
import ProductModify from "./ProductModify";

const ProductTitle = ({ data }: ProductTitleProps) => {
  const userId = useSelector((state: RootState) => state.user.id);
  const category = Object.values(categoryData).find(
    (e) => e.id === data?.categoryId,
  );

  return (
    <div className="flex h-full flex-col justify-between gap-10">
      <div className="flex-1 space-y-3 text-lg text-gray-700">
        <ul className="breadcrumb">
          <li>카테고리</li>
          <li>
            <Link
              className="cursor-pointer"
              to={`/search?category=${category?.id}&page=1`}
            >
              {category?.label}
            </Link>
          </li>
        </ul>

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
      {userId === data.user.id && <ProductModify data={data} />}
    </div>
  );
};

export default React.memo(ProductTitle);
