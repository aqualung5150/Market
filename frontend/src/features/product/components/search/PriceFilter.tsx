import usePriceFilter from "features/product/hooks/usePriceFilter";
import React from "react";

const PriceFilter = () => {
  const { minPrice, maxPrice, handleClick } = usePriceFilter();

  return (
    <div className="flex items-center gap-2">
      <input
        className="rounded border p-2 outline-none"
        placeholder="최소 가격"
        {...minPrice}
      />
      <span>~</span>
      <input
        className="rounded border p-2 outline-none"
        placeholder="최대 가격"
        {...maxPrice}
      />
      <button
        onClick={handleClick}
        className="h-10 w-14 rounded bg-black text-white"
      >
        적용
      </button>
    </div>
  );
};

export default React.memo(PriceFilter);
