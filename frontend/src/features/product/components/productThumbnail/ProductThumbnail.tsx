import React from "react";
import timeAgo from "../../../../utils/timeAgo";
import { ProductData } from "../../../../types/product";
import { Link } from "react-router-dom";

const ProductThumbnail = ({ product }: { product: ProductData }) => {
  return (
    <div className="flex aspect-[3/5] w-full cursor-pointer flex-col rounded-lg bg-white shadow-lg">
      <Link className="h-fit" to={`/product/${product.id}`}>
        <img
          className="aspect-square rounded-t-lg object-cover"
          src={`${process.env.REACT_APP_API_URL}/product/productImage/${
            product.images.find((e) => e.main)?.url
          }`}
        />
      </Link>
      <div className="flex w-full flex-1 flex-col justify-around px-2">
        <div className="text-base font-semibold">{product?.title}</div>
        <div className="text-sm font-semibold">
          {product?.price.toLocaleString()}원
        </div>
        <div className="text-xs text-gray-700">
          {timeAgo(new Date(product.createdAt))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductThumbnail);
