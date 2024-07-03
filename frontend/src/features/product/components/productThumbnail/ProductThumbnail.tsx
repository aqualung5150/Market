import React from "react";
import timeAgo from "../../../../utils/timeAgo";
import { ProductData } from "../../../../types/product";
import { Link } from "react-router-dom";

const ProductThumbnail = ({ product }: { product: ProductData }) => {
  return (
    <div className="bg-white aspect-[3/5] flex flex-col w-full rounded-lg shadow-lg cursor-pointer">
      <Link className="h-fit" to={`/product/${product.id}`}>
        <img
          className="aspect-square rounded-t-lg object-cover"
          src={`${process.env.REACT_APP_API_URL}/product/productImage/${
            product.images.find((e) => e.main)?.url
          }`}
        />
      </Link>
      <div className="flex-1 w-full justify-around flex flex-col px-2">
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
