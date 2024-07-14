import React, { useState } from "react";
import { ReactComponent as PlusIcon } from "assets/plus.svg";
import { ReactComponent as MinusIcon } from "assets/minus.svg";
import categoryData from "../../data/category.json";
import { Link } from "react-router-dom";
import PriceFilter from "./PriceFilter";
import OptionFilter from "./OptionFilter";

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

const ProductsFilter = ({ categoryId, keyword }: any) => {
  const [spread, setSpread] = useState(false);
  const category = Object.values(categoryData).find((e) => e.id === categoryId);

  return (
    <div className="w-full">
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
              <ul className="breadcrumb">
                <li>
                  <Link to={`/search?page=1`}>전체</Link>
                </li>
                {category && (
                  <li>
                    <Link to={`/search?category=${categoryId}&page=1`}>
                      {category.label}
                    </Link>
                  </li>
                )}
              </ul>
            </td>
          </tr>
          <tr className={`${!spread && "hidden"}`}>
            <td className="border-none" />
            <td>
              <div className="grid grid-cols-3 gap-3 text-sm">
                {Object.values(categoryData).map((e) => (
                  <Link key={e.id} to={`/search?category=${e.id}&page=1`}>
                    {e.label}
                  </Link>
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <td>가격</td>
            <td>
              <PriceFilter />
            </td>
          </tr>
          <tr>
            <td>옵션</td>
            <td>
              <OptionFilter />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(ProductsFilter);
