import useFormInput from "hooks/useFormInput";
import React, { useCallback, useEffect } from "react";
import { SearchParamsProps } from "types/product";

const PriceFilterMobile = ({
  searchParams,
  setSearchParams,
}: SearchParamsProps) => {
  console.log("PriceFilter rerender");
  const { inputProps: minPrice, setValue: setMinPrice } = useFormInput("");
  const { inputProps: maxPrice, setValue: setMaxPrice } = useFormInput("");

  const isNumeric = useCallback(
    // (string: string) => /^[+-]?\d+(\.\d+)?$/.test(string),
    (string: string) => /^\d*$/.test(string),
    [],
  );

  useEffect(() => {
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    setMinPrice(minPriceParam ? minPriceParam : "");
    setMaxPrice(maxPriceParam ? maxPriceParam : "");
  }, [searchParams]);

  const handleClick = () => {
    //     if (!minPrice.value && !maxPrice.value) return;
    if (!isNumeric(minPrice.value) || !isNumeric(maxPrice.value)) return;
    // if (!minPrice.value || !isNumeric(minPrice.value)) return;
    // if (maxPrice.value && !isNumeric(maxPrice.value)) return;
    searchParams.set("minPrice", minPrice.value ? minPrice.value : "0");
    if (maxPrice.value) searchParams.set("maxPrice", maxPrice.value);
    else searchParams.delete("maxPrice");
    setSearchParams(searchParams);
  };

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
