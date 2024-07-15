import React, { useState } from "react";
import { ReactComponent as PlusIcon } from "assets/plus.svg";
import { ReactComponent as MinusIcon } from "assets/minus.svg";
import PriceFilter from "./PriceFilter";
import OptionFilter from "./OptionFilter";
import { ProductFilterProps } from "types/product";
import BreadcrumbFilter from "./BreadcrumbFilter";
import CategoryFilter from "./CategoryFilter";
import SelectedFilters from "./SelectedFilters";

// const 카테고리형식 = {
//   "139": {
//     seq: 139,
//     label: "스마트폰",
//     imageUrl: "",
//     parentSeq: 6,
//     level: 2,
//     path: "/모바일-태블릿/스마트폰",
//     categoryFilter: [
//       { categoryDepth: 1, categorySeq: 6 },
//       { categoryDepth: 2, categorySeq: 139 },
//     ],
//   },
// };

const ProductsFilter = ({
  keyword,
  searchParams,
  setSearchParams,
}: ProductFilterProps) => {
  const [spread, setSpread] = useState(false);

  return (
    <div className="hidden w-full lg:block">
      <div className="flex w-full gap-2 pb-2 pl-2">
        {keyword && (
          <h1>
            <strong>"{keyword}"</strong>
          </h1>
        )}
        <h1>검색결과</h1>
      </div>
      <table className="filter-table w-full">
        <tbody>
          <tr>
            <td className="flex w-full items-center justify-between">
              <span>카테고리</span>
              {spread ? (
                <MinusIcon
                  onClick={() => setSpread(false)}
                  className="h-6 w-6 cursor-pointer stroke-gray-400"
                />
              ) : (
                <PlusIcon
                  onClick={() => setSpread(true)}
                  className="h-6 w-6 cursor-pointer stroke-gray-400"
                />
              )}
            </td>
            <td>
              <BreadcrumbFilter {...{ searchParams, setSearchParams }} />
            </td>
          </tr>
          <tr className={`${!spread && "hidden"}`}>
            <td className="border-none" />
            <td>
              <CategoryFilter {...{ searchParams, setSearchParams }} />
            </td>
          </tr>
          <tr>
            <td>가격</td>
            <td>
              <PriceFilter {...{ searchParams, setSearchParams }} />
            </td>
          </tr>
          <tr>
            <td>옵션</td>
            <td>
              <OptionFilter {...{ searchParams, setSearchParams }} />
            </td>
          </tr>
          <tr>
            <td>필터</td>
            <td>
              <SelectedFilters {...{ searchParams, setSearchParams }} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(ProductsFilter);
