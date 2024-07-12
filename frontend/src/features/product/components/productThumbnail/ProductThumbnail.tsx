import React from "react";
import { Link } from "react-router-dom";
import { ProductData } from "types/product";
import timeAgo from "utils/timeAgo";
import { ReactComponent as CheckIcon } from "assets/check.svg";

const ProductThumbnail = ({ product }: { product: ProductData }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="flex aspect-[3/5] w-full cursor-pointer flex-col rounded-lg bg-white shadow lg:aspect-[2/3]"
    >
      <div className="relative aspect-square w-full rounded-t-lg">
        <img
          loading="lazy"
          className="aspect-square w-full rounded-t-lg object-cover"
          src={`${process.env.REACT_APP_API_URL}/product/productImage/${
            product.images.find((e) => e.main)?.url
          }?impolicy=thumb`}
        />
        {product.status === 1 && (
          <div className="absolute left-0 top-0 flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-t-lg bg-black/50">
            <CheckIcon className="h-16 w-16 stroke-white/85 lg:h-24 lg:w-24" />
            <span className="text-base font-bold text-white/85 lg:text-2xl">
              판매완료
            </span>
          </div>
        )}
      </div>
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
