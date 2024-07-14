import useFormInput from "hooks/useFormInput";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const PriceFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { inputProps: minPrice } = useFormInput("");
  const { inputProps: maxPrice } = useFormInput("");

  const isNumeric = useCallback(
    (string: string) => /^[+-]?\d+(\.\d+)?$/.test(string),
    [],
  );

  const handleClick = () => {
    if (!minPrice.value && !maxPrice.value) return;
    if (!isNumeric(minPrice.value) || !isNumeric(maxPrice.value)) return;
    searchParams.set("minPrice", minPrice.value ? minPrice.value : "0");
    searchParams.set("maxPrice", maxPrice.value);
    setSearchParams(searchParams);
  };

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

export default PriceFilter;
