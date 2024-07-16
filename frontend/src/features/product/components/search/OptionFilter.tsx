import React from "react";
import { ReactComponent as CheckIcon } from "assets/check.svg";
import { SearchParamsProps } from "types/product";

const OptionFilter = ({ searchParams, setSearchParams }: SearchParamsProps) => {
  const status = searchParams.get("status");
  const condition = searchParams.get("condition");

  const setQuery = (key: string, value: string) => {
    if (searchParams.get(key)) searchParams.delete(key);
    else searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div
        className="flex cursor-pointer gap-1 font-semibold"
        onClick={() => setQuery("status", "0")}
      >
        <CheckIcon
          className={`h-6 w-6 ${status && status === "0" ? "stroke-gray-300" : "stroke-green-500"}`}
        />
        <span>판매완료 상품 포함</span>
      </div>
      <div
        className="flex cursor-pointer gap-1 font-semibold"
        onClick={() => setQuery("condition", "1")}
      >
        <CheckIcon
          className={`h-6 w-6 ${condition && condition === "1" ? "stroke-green-500" : "stroke-gray-300"}`}
        />
        <span>새상품만 보기</span>
      </div>
    </div>
  );
};

export default React.memo(OptionFilter);
