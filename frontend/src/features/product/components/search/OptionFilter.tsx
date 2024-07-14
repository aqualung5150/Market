import React, { useEffect, useState } from "react";
import { ReactComponent as CheckIcon } from "assets/check.svg";
import { useSearchParams } from "react-router-dom";

const OptionFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [soldFilter, setSoldFilter] = useState(false);
  const [newFilter, setNewFilter] = useState(false);
  const [usedFilter, setUsedFilter] = useState(false);

  useEffect(() => {
    const filters: string[] = searchParams.getAll("filter");
    setSoldFilter(filters.find((e) => e === "sold") ? true : false);
    setUsedFilter(filters.find((e) => e === "used") ? true : false);
    setNewFilter(filters.find((e) => e === "new") ? true : false);
  }, [searchParams]);

  const setFilter = (value: string, set: boolean) => {
    if (set) searchParams.append("filter", value);
    else searchParams.delete("filter", value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex gap-4">
      <div
        className="flex cursor-pointer gap-1 font-semibold"
        onClick={() => setFilter("sold", !soldFilter)}
      >
        <CheckIcon
          className={`h-6 w-6 ${soldFilter ? "stroke-gray-300" : "stroke-green-500"}`}
        />
        <span>판매완료</span>
      </div>
      <div
        className="flex cursor-pointer gap-1 font-semibold"
        onClick={() => setFilter("used", !usedFilter)}
      >
        <CheckIcon
          className={`h-6 w-6 ${usedFilter ? "stroke-gray-300" : "stroke-green-500"}`}
        />
        <span>중고상품</span>
      </div>
      <div
        className="flex cursor-pointer gap-1 font-semibold"
        onClick={() => setFilter("new", !newFilter)}
      >
        <CheckIcon
          className={`h-6 w-6 ${newFilter ? "stroke-gray-300" : "stroke-green-500"}`}
        />
        <span>새상품</span>
      </div>
      {/* </p> */}
    </div>
  );
};

export default React.memo(OptionFilter);
