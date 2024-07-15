import React, { useEffect, useState } from "react";
import { ReactComponent as CheckIcon } from "assets/check.svg";
import { useSearchParams } from "react-router-dom";
import { SearchParamsProps } from "types/product";

const OptionFilter = ({ searchParams, setSearchParams }: SearchParamsProps) => {
  const filters: string[] = searchParams.getAll("filter");

  const navFilter = (option: string) => {
    if (filters.find((e) => e === option))
      searchParams.delete("filter", option);
    else searchParams.append("filter", option);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div
        className="flex cursor-pointer gap-1 font-semibold"
        onClick={() => navFilter("sold")}
      >
        <CheckIcon
          className={`h-6 w-6 ${filters.find((e) => e === "sold") ? "stroke-gray-300" : "stroke-green-500"}`}
        />
        <span>판매완료</span>
      </div>
      <div
        className="flex cursor-pointer gap-1 font-semibold"
        onClick={() => navFilter("used")}
      >
        <CheckIcon
          className={`h-6 w-6 ${filters.find((e) => e === "used") ? "stroke-gray-300" : "stroke-green-500"}`}
        />
        <span>중고상품</span>
      </div>
      <div
        className="flex cursor-pointer gap-1 font-semibold"
        onClick={() => navFilter("new")}
      >
        <CheckIcon
          className={`h-6 w-6 ${filters.find((e) => e === "new") ? "stroke-gray-300" : "stroke-green-500"}`}
        />
        <span>새상품</span>
      </div>
    </div>
  );
};

export default React.memo(OptionFilter);
