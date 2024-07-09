import React from "react";
import { Link } from "react-router-dom";
import { ProductData } from "types/product";
import timeAgo from "utils/timeAgo";

const ProductThumbnail = ({ product }: { product: ProductData }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="flex aspect-[3/5] w-full cursor-pointer flex-col rounded-lg border bg-white shadow-md lg:aspect-[2/3]"
    >
      <img
        className="aspect-square rounded-t-lg object-cover"
        src={`${process.env.REACT_APP_API_URL}/product/productImage/${
          product.images.find((e) => e.main)?.url
        }`}
      />
      <div className="flex w-full flex-1 flex-col p-2">
        <div className="flex-1 space-y-1">
          <div className="text-base font-semibold lg:text-lg">
            {product?.title}
          </div>
          <div className="text-sm font-semibold lg:text-base">
            {product?.price.toLocaleString()}원
          </div>
        </div>
        <div className="self-end text-xs text-gray-500 lg:text-sm">
          {timeAgo(new Date(product.createdAt))}
        </div>
      </div>
    </Link>
  );
};

export default React.memo(ProductThumbnail);
