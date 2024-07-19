import usePriceFilter from "features/product/hooks/usePriceFilter";
import React from "react";

const PriceFilterMobile = () => {
  const { minPrice, maxPrice, handleClick } = usePriceFilter();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <input
          className="w-36 rounded border p-2 outline-none"
          placeholder="최소 가격"
          {...minPrice}
        />
        <span>~</span>
        <input
          className="w-36 rounded border p-2 outline-none"
          placeholder="최대 가격"
          {...maxPrice}
        />
      </div>
      <button
        onClick={handleClick}
        className="mt-2 h-10 w-full rounded bg-black text-white"
      >
        적용
      </button>
    </div>
  );
};

export default React.memo(PriceFilterMobile);
